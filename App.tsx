
import React, { useState, useMemo, useEffect } from 'react';
import { HealthStatus, Service, AppConfig } from './types';
import ServiceCard from './components/ServiceCard';
import HealthSummaryCard from './components/HealthSummaryCard';
import ServiceDrawer from './components/ServiceDrawer';
import Login from './components/Login';
import { fetchConfig, fetchHealthData, logoutUser } from './api';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('auth_token'));
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(15000);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  // Initialize from config if authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    
    fetchConfig().then(cfg => {
      setConfig(cfg);
      const initialServices: Service[] = [];
      cfg.categories.forEach(cat => {
        cat.services.forEach(s => {
          initialServices.push({
            id: s.id,
            name: s.name,
            category: cat.name,
            status: HealthStatus.HEALTHY,
            lastUpdated: new Date().toISOString(),
            metrics: [
              { label: 'CPU', value: '12%', history: [10, 15, 12, 14, 12, 11] },
              { label: 'Memory', value: '450MB', history: [400, 420, 450, 440, 455] }
            ]
          });
        });
      });
      setServices(initialServices);
    });
  }, [isAuthenticated]);

  // Polling logic
  useEffect(() => {
    if (!config || !isAuthenticated) return;
    const interval = setInterval(async () => {
      // In a real scenario, this would call fetchHealthData() and merge with current state
      setServices(prev => prev.map(s => ({
        ...s,
        lastUpdated: new Date().toISOString(),
        metrics: s.metrics.map(m => {
          const lastVal = m.history[m.history.length - 1];
          const newVal = Math.max(0, lastVal + (Math.random() * 20 - 10));
          const newHistory = [...m.history.slice(1), newVal];
          return {
            ...m,
            value: typeof lastVal === 'number' ? `${Math.round(newVal)}%` : m.value,
            history: newHistory
          };
        })
      })));
      setLastUpdate(Date.now());
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [config, refreshInterval, isAuthenticated]);

  const filteredServices = useMemo(() => {
    return services.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [services, searchQuery]);

  const stats = useMemo(() => {
    const unhealthy = services.filter(s => s.status !== HealthStatus.HEALTHY && s.status !== HealthStatus.ACTIVE).length;
    return { total: services.length, unhealthy };
  }, [services]);

  const categories = useMemo(() => {
    return Array.from(new Set(services.map(s => s.category))).sort();
  }, [services]);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  if (!config) return <div className="h-screen flex items-center justify-center font-bold text-slate-400 bg-slate-50">Initializing Platform...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className={`h-1.5 w-full transition-colors duration-500 ${stats.unhealthy > 0 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>

      <header className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center space-x-4">
          <div className="bg-slate-900 p-1.5 rounded-lg shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div>
            <h1 className="font-black text-slate-900 leading-tight text-sm uppercase tracking-tight">{config.platformName}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{config.environment}</span>
              <span className="text-slate-300 text-[10px]">•</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">v2.1.0</span>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search services..." 
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-100 rounded-lg p-1 mr-2">
            <button onClick={() => setViewType('grid')} className={`p-1.5 rounded ${viewType === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
            <button onClick={() => setViewType('list')} className={`p-1.5 rounded ${viewType === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
          </div>
          <button 
            onClick={logoutUser}
            className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full">
        <HealthSummaryCard services={services} />
        {/* Rest of the UI renders as before... */}
        {categories.map(cat => {
          const categoryServices = filteredServices.filter(s => s.category === cat);
          if (categoryServices.length === 0) return null;
          return (
            <section key={cat} className="space-y-4">
              <div onClick={() => {
                const next = new Set(collapsedSections);
                if (next.has(cat)) next.delete(cat); else next.add(cat);
                setCollapsedSections(next);
              }} className="flex justify-between items-center group cursor-pointer border-b border-slate-100 pb-2">
                <h2 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">{cat} ({categoryServices.length})</h2>
                <div className={`text-slate-300 transition-transform ${collapsedSections.has(cat) ? '-rotate-90' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              {!collapsedSections.has(cat) && (
                <div className={viewType === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-3'}>
                  {categoryServices.map(service => (
                    <ServiceCard key={service.id} service={service} viewType={viewType} onClick={setSelectedService} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </main>

      <ServiceDrawer service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  );
};

export default App;
