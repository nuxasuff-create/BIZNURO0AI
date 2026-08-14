import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Users, DollarSign, Activity, Settings, LogOut, Trash2, Edit, Save, X, BarChart3, ShieldAlert, FileText, Server } from 'lucide-react';
import { CustomerDue } from '../../types';

const AdminPanel: React.FC = () => {
  const { dues, updateDue, deleteDue } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<CustomerDue>>({});

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.href = '/';
  };

  const startEdit = (due: CustomerDue) => {
    setEditingId(due.id);
    setEditForm(due);
  };

  const saveEdit = () => {
    if (editingId && editForm) {
      updateDue(editForm as CustomerDue);
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const stats = [
    { title: 'Total Users', value: '1,245', icon: Users, color: 'text-blue-500', trend: '+12% this month' },
    { title: 'Active Sessions', value: '84', icon: Activity, color: 'text-green-500', trend: 'Currently Online' },
    { title: 'Total Revenue', value: `${dues.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} BDT`, icon: DollarSign, color: 'text-yellow-500', trend: `${dues.length} records` },
    { title: 'System Status', value: 'Operational', icon: Server, color: 'text-emerald-500', trend: 'Uptime: 99.9%' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      {/* Admin Header */}
      <header className="flex justify-between items-center mb-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">System Admin</h1>
          <p className="text-slate-400 text-sm">Dashboard Overview & Data Management</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 transition">
              <div className="flex justify-between items-start mb-4">
                <span className="text-slate-400 text-sm font-medium">{s.title}</span>
                <s.icon size={20} className={s.color} />
              </div>
              <div className="text-3xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs text-slate-500 font-mono">{s.trend}</div>
            </div>
          ))}
        </div>

        {/* Data Management Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText size={20} className="text-cyan-500"/> Application Data: Customer Dues
            </h2>
            <div className="flex gap-3">
              <button className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl transition font-medium">Export CSV</button>
              <button className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl transition font-medium">Add New Record</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-950/50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Mobile</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Days</th>
                  <th className="px-6 py-4">Risk</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {dues.map((due) => (
                  <tr key={due.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4 font-mono text-xs">{due.id.slice(0,8)}</td>
                    {editingId === due.id ? (
                      <>
                        <td className="px-6 py-4"><input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="bg-slate-950 border border-slate-700 rounded p-1.5 text-white w-full"/></td>
                        <td className="px-6 py-4"><input value={editForm.mobile} onChange={e => setEditForm({ ...editForm, mobile: e.target.value })} className="bg-slate-950 border border-slate-700 rounded p-1.5 text-white w-full"/></td>
                        <td className="px-6 py-4"><input type="number" value={editForm.amount} onChange={e => setEditForm({ ...editForm, amount: Number(e.target.value) })} className="bg-slate-950 border border-slate-700 rounded p-1.5 text-white w-24"/></td>
                        <td className="px-6 py-4"><input type="number" value={editForm.daysPending} onChange={e => setEditForm({ ...editForm, daysPending: Number(e.target.value) })} className="bg-slate-950 border border-slate-700 rounded p-1.5 text-white w-16"/></td>
                        <td className="px-6 py-4"><select value={editForm.risk} onChange={e => setEditForm({ ...editForm, risk: e.target.value as any })} className="bg-slate-950 border border-slate-700 rounded p-1.5 text-white w-full"><option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option></select></td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={saveEdit} className="text-green-500 mr-3"><Save size={18} /></button>
                          <button onClick={cancelEdit} className="text-red-500"><X size={18} /></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 font-semibold text-slate-100">{due.name}</td>
                        <td className="px-6 py-4">{due.mobile}</td>
                        <td className="px-6 py-4 font-mono font-medium">{due.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">{due.daysPending}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${due.risk === 'High' ? 'bg-red-500/10 text-red-400' : due.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            {due.risk}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-3">
                          <button onClick={() => startEdit(due)} className="text-blue-400 hover:text-blue-300"><Edit size={16} /></button>
                          <button onClick={() => deleteDue(due.id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Toggles & System Logs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Settings size={20}/> Feature Management</h2>
                <div className="space-y-4">
                    {[{name: 'AI Invoice', desc: 'Gemini-powered suggestions'}, {name: 'Voice Entry', desc: 'Beta voice transactions'}].map(f => (
                        <div key={f.name} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                            <div>
                                <h3 className="font-semibold text-white">{f.name}</h3>
                                <p className="text-xs text-slate-500">{f.desc}</p>
                            </div>
                            <div className="w-12 h-6 bg-emerald-600 rounded-full p-1 cursor-pointer flex justify-end">
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><ShieldAlert size={20}/> System Health & Logs</h2>
                <div className="space-y-3 font-mono text-xs text-slate-500">
                    <p className="text-emerald-500">[INFO] System operational</p>
                    <p>[WARN] High traffic detected at 05:00 UTC</p>
                    <p className="text-red-400">[ERR] Failed sync attempt - user_id: 849</p>
                    <p>[INFO] Database backup completed</p>
                    <p className="text-slate-600">...see more logs</p>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
