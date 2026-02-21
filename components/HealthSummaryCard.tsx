
import React from 'react';
import { HealthStatus, Service } from '../types';

interface HealthSummaryCardProps {
  services: Service[];
}

const HealthSummaryCard: React.FC<HealthSummaryCardProps> = ({ services }) => {
  // Identify unhealthy services locally to avoid AI calls
  const unhealthyServices = services.filter(s => 
    s.status === HealthStatus.WARNING || s.status === HealthStatus.CRITICAL
  );
  
  const isHealthy = unhealthyServices.length === 0;

  const getSummaryMessage = () => {
    if (isHealthy) {
      return "All platform services are operational. Performance metrics are within expected thresholds across all monitored infrastructure segments.";
    }
    const criticals = unhealthyServices.filter(s => s.status === HealthStatus.CRITICAL).length;
    const warnings = unhealthyServices.filter(s => s.status === HealthStatus.WARNING).length;
    
    return `System alert: ${criticals > 0 ? `${criticals} critical failure(s) and ` : ''}${warnings} service warning(s) detected. Platform health is currently degraded. Please prioritize review of ${unhealthyServices[0].name}.`;
  };

  return (
    <div className={`
      ${isHealthy ? 'bg-emerald-950 border-emerald-800' : 'bg-slate-900 border-slate-800'} 
      text-slate-100 p-6 rounded-2xl shadow-xl overflow-hidden relative border transition-all duration-500
    `}>
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
        </svg>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-3">
          <div className={`${isHealthy ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full p-1 shadow-lg`}>
            {isHealthy ? (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">System Health Overview</h2>
        </div>
        
        <p className="text-sm sm:text-base leading-relaxed font-medium max-w-3xl">
          {getSummaryMessage()}
        </p>
      </div>
    </div>
  );
};

export default HealthSummaryCard;
