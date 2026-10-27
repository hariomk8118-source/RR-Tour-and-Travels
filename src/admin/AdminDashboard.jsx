import { useState } from 'react';
import { clearToken } from './api';
import BillGenerator from './BillGenerator';
import BillPreview from './BillPreview';

export default function AdminDashboard({ onLogout }) {
  const [selectedBill, setSelectedBill] = useState(null);

  const logout = () => {
    clearToken();
    onLogout();
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <span className="brand-badge">RR</span>
          <h2>Bill Generator</h2>
        </div>
        <div className="admin-header-right">
          <a href="/" className="btn btn-outline btn-sm">View Site</a>
          <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="admin-content">
        <BillGenerator onBillCreated={setSelectedBill} />
      </div>

      {selectedBill && <BillPreview bill={selectedBill} onClose={() => setSelectedBill(null)} />}
    </div>
  );
}
