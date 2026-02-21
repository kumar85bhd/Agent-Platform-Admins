
import React from 'react';
import { HealthStatus, Service } from '../types';
import { getRelativeTime } from '../utils';

interface ServiceCardProps {
  service: Service;
  viewType: 'grid' | 'list';
  onClick: (s: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, viewType, onClick }) => {
  const getStatusColor = (status: HealthStatus) => {
    switch (status) {
      case HealthStatus.HEALTHY: return 'bg-emerald-500';
      case HealthStatus.WARNING: return 'bg-amber-500';
      case HealthStatus.CRITICAL: return 'bg-rose-500';
      case HealthStatus.ACTIVE: return 'bg-blue-500';
      default: return 'bg-slate-400';
    }
  };

  const getBorderColor = (status: HealthStatus) => {
    switch (status) {
      case HealthStatus.HEALTHY: return 'border-l-emerald-500';
      case HealthStatus.WARNING: return 'border-l-amber-500';
      case HealthStatus.CRITICAL: return 'border-l-rose-500';
      case HealthStatus.ACTIVE: return 'border-l-blue-500';
      default: return 'border-l-slate-400';
    }
  };

  const getServiceIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('database') || t.includes('postgres') || t.includes('sql')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    }
    if (t.includes('agent') || t.includes('ai') || t.includes('bot')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    if (t.includes('redis') || t.includes('cache') || t.includes('kv')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    }
    if (t.includes('observability') || t.includes('monitor') || t.includes('log')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-7 0V7m0 5v5" />
      </svg>
    );
  };

  const isGrid = viewType === 'grid';

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (service.url) {
      window.open(service.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      onClick={() => onClick(service)}
      className={`
        bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 ${getBorderColor(service.status)}
        hover:shadow-lg hover:border-slate-200 transition-all duration-200 cursor-pointer overflow-hidden group/card
        ${isGrid ? 'p-5 flex flex-col h-full' : 'p-4 flex flex-row items-center justify-between gap-4'}
      `}
    >
      <div className={isGrid ? 'mb-4' : 'flex-1'}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <div className="text-slate-400 group-hover/card:text-indigo-500 transition-colors">
              {getServiceIcon(service.type)}
            </div>
            <h3 className="font-bold text-slate-800 text-sm tracking-tight">{service.name}</h3>
          </div>
          {service.url && (
            <button 
              onClick={handleExternalClick}
              className="text-slate-300 hover:text-indigo-600 transition-colors opacity-0 group-hover/card:opacity-100 p-1"
              title="Open in new tab"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className={`h-2 w-2 rounded-full ${getStatusColor(service.status)}`}></span>
          <span className={`font-bold capitalize text-[10px] ${getStatusColor(service.status).replace('bg-', 'text-')}`}>
            {service.status}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400 text-[9px] font-medium">Updated {getRelativeTime(service.lastUpdated)}</span>
        </div>
      </div>

      <div className={`${isGrid ? 'mt-auto grid grid-cols-2 gap-2' : 'flex-2 flex items-center space-x-4'}`}>
        {service.metrics.map((m, i) => (
          <div key={i} className="bg-slate-50 px-2.5 py-2 rounded-lg border border-slate-100 group transition-colors hover:bg-white min-w-[100px]">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[8px] uppercase font-black text-slate-400 tracking-widest">{m.label}</span>
            </div>
            <span className="text-sm font-black text-slate-700 tracking-tight">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;
