
import React from 'react';
import { HealthStatus, Service } from '../types';

interface HealthSummaryCardProps {
  services: Service[];
  isCollapsed: boolean;
  onToggle: () => void;
}

const HealthSummaryCard: React.FC<HealthSummaryCardProps> = ({ services, isCollapsed, onToggle }) => {
  const criticals = services.filter(s => s.status === HealthStatus.CRITICAL).length;
  const warnings = services.filter(s => s.status === HealthStatus.WARNING).length;
  
  const status = criticals > 0 ? 'critical' : warnings > 0 ? 'warning' : 'healthy';

  const getSummaryMessage = () => {
    if (status === 'healthy') {
      return "All platform services are operational. Performance metrics are within expected thresholds across all monitored infrastructure segments.";
    }
    if (status === 'critical') {
      return `System Alert: ${criticals} critical failure(s) detected. Platform functionality is severely impacted. Immediate intervention required.`;
    }
    return `Service Warning: ${warnings} service(s) reporting degraded performance. Monitoring for potential escalation.`;
  };

  const getStatusStyles = () => {
    switch (status) {
      case 'critical': return 'bg-rose-950 border-rose-800 text-rose-100';
      case 'warning': return 'bg-amber-950 border-amber-800 text-amber-100';
      default: return 'bg-emerald-950 border-emerald-800 text-emerald-100';
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'critical': return 'bg-rose-500';
      case 'warning': return 'bg-amber-500';
      default: return 'bg-emerald-500';
    }
  };

  return (
    <div className={`
      ${getStatusStyles()} 
      rounded-2xl shadow-xl overflow-hidden relative border transition-all duration-500
      ${isCollapsed ? 'py-3 px-6' : 'p-6'}
    `}>
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
        </svg>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`${getIconColor()} rounded-full p-1 shadow-lg`}>
              {status === 'healthy' ? (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : status === 'critical' ? (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div>
              <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">System Health Overview</h2>
              {isCollapsed && (
                <p className="text-xs font-bold mt-0.5">
                  {status === 'healthy' ? 'All Systems Operational' : status === 'critical' ? `${criticals} Critical Failures` : `${warnings} Service Warnings`}
                </p>
              )}
            </div>
          </div>
          <button 
            onClick={onToggle}
            className="text-white/40 hover:text-white transition-colors p-1"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <svg className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        
        {!isCollapsed && (
          <p className="mt-4 text-sm sm:text-base leading-relaxed font-medium max-w-3xl animate-in fade-in slide-in-from-top-2 duration-500">
            {getSummaryMessage()}
          </p>
        )}
      </div>
    </div>
  );
};

export default HealthSummaryCard;
