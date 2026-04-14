import { Shield } from 'lucide-react';

const MentorBadge = ({ level, size = 16, className = "" }) => {
  if (!level || level === 'none') return null;

  const badgeConfig = {
    bronze: { color: 'text-amber-600', bg: 'bg-amber-100', label: 'Bronze' },
    silver: { color: 'text-slate-500', bg: 'bg-slate-100', label: 'Silver' },
    gold: { color: 'text-yellow-500', bg: 'bg-yellow-100', label: 'Gold' }
  };

  const config = badgeConfig[level];

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full ${config.bg} ${config.color} ${className}`} title={`${config.label} Mentor`}>
      <Shield size={size} fill="currentColor" />
      <span className="text-xs font-bold uppercase tracking-wider">{config.label}</span>
    </div>
  );
};

export default MentorBadge;
