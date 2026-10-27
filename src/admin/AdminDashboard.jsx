import { useState, useEffect } from 'react';
import { fetchBills, deleteBill, clearToken } from './api';
import BillGenerator from './BillGenerator';
import BillPreview from './BillPreview';

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AdminDashboard({ onLogout }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // list | create
  const [selectedBill, setSelectedBill] = useState(null);

  const loadBills = async () => {
    setLoading(true);
    try {
      const data = await fetchBills();
      setBills(data);
    } catch {
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBills(); }, []);

  const handleBillCreated = (bill) => {
    setSelectedBill(bill);
    setView('list');
    loadBills();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this bill?')) return;
    await deleteBill(id);
    loadBills();
  };

  const logout = () => {
    clearToken();
    onLogout();
  };

  const totalRevenue = bills.reduce((s, b) => s + Number(b.totalAmount || 0), 0);
  const totalBalance = bills.reduce((s, b) => s + Number(b.balanceDue || 0), 0);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <span className="brand-badge">RR</span>
          <h2>Admin Panel</h2>
        </div>
        <div className="admin-header-right">
          <a href="/" className="btn btn-outline btn-sm">View Site</a>
          <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-value">{bills.length}</span>
          <span className="stat-label">Total Bills</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">₹{totalRevenue.toLocaleString('en-IN')}</span>
          <span className="stat-label">Total Revenue</span>
        </div>
        <div className="stat-card">
          <span className="stat-value text-red">₹{totalBalance.toLocaleString('en-IN')}</span>
          <span className="stat-label">Pending Balance</span>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>
          All Bills
        </button>
        <button className={`admin-tab ${view === 'create' ? 'active' : ''}`} onClick={() => setView('create')}>
          + New Bill
        </button>
      </div>

      {view === 'create' && <BillGenerator onBillCreated={handleBillCreated} />}

      {view === 'list' && (
        <div className="bills-list">
          {loading && <p className="bills-loading">Loading bills...</p>}
          {!loading && bills.length === 0 && <p className="bills-empty">No bills yet. Create your first bill!</p>}
          {!loading && bills.map((bill) => (
            <div key={bill._id} className="bill-card" onClick={() => setSelectedBill(bill)}>
              <div className="bill-card-top">
                <span className="bill-card-no">{bill.billNo}</span>
                <span className="bill-card-date">{formatDate(bill.createdAt)}</span>
              </div>
              <div className="bill-card-body">
                <div className="bill-card-info">
                  <strong>{bill.customerName}</strong>
                  <span>{bill.vehicle}</span>
                  <span>{bill.pickup} → {bill.drop}</span>
                </div>
                <div className="bill-card-amount">
                  <span className="bill-card-total">₹{Number(bill.totalAmount).toLocaleString('en-IN')}</span>
                  {Number(bill.balanceDue) > 0 && (
                    <span className="bill-card-balance text-red">Due: ₹{Number(bill.balanceDue).toLocaleString('en-IN')}</span>
                  )}
                  {Number(bill.balanceDue) <= 0 && (
                    <span className="bill-card-balance text-green">Paid</span>
                  )}
                </div>
              </div>
              <button
                className="bill-card-delete"
                onClick={(e) => { e.stopPropagation(); handleDelete(bill._id); }}
                title="Delete bill"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedBill && <BillPreview bill={selectedBill} onClose={() => setSelectedBill(null)} />}
    </div>
  );
}
