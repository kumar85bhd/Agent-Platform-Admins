
import React from 'react';
import { Service, HealthStatus } from '../types';

interface ServiceDrawerProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceDrawer: React.FC<ServiceDrawerProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out border-l border-slate-200">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">{service.name}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto">
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Health Status</h3>
              <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className={`h-3 w-3 rounded-full animate-pulse ${
                  service.status === HealthStatus.HEALTHY ? 'bg-emerald-500' : 'bg-amber-500'
                }`} />
                <span className="font-bold capitalize">{service.status}</span>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Detailed Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {service.metrics.map((m, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{m.label}</p>
                    <p className="text-lg font-bold text-slate-800">{m.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Metadata</h3>
              <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service ID</span>
                  <span className="font-mono text-slate-700">{service.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Category</span>
                  <span className="text-slate-700">{service.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Seen</span>
                  <span className="text-slate-700">{new Date(service.lastUpdated).toLocaleString()}</span>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">
              VIEW CLOUD LOGS
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDrawer;
