
import React, { useState } from 'react';
import { loginUser } from '../api';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginUser(username, password);
      onLoginSuccess();
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-indigo-600 p-3 rounded-2xl shadow-xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-widest">Agentic Admin</h1>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold p-3 rounded-xl text-center">{error}</div>}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
            </div>
            <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="uppercase tracking-widest text-sm">Sign In</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
