import React from 'react';

interface ContentSectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  isPrimary?: boolean;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, icon, children, isPrimary = false, className = '' }) => {
  const baseClasses = "h-full p-4 rounded-lg border-2 border-dotted shadow-lg";
  const backgroundClasses = "bg-white"; 
  const borderClasses = isPrimary ? "border-red-400" : "border-yellow-500";
  
  return (
    <div className={`${baseClasses} ${backgroundClasses} ${borderClasses} ${className}`}>
      <h3 className="font-display text-2xl text-rose-700 mb-3 flex items-center gap-2">
        {icon && <span className="text-2xl">{icon}</span>}
        {title}
      </h3>
      <div className="text-slate-800 text-sm leading-6 break-words">
        {children}
      </div>
    </div>
  );
};

export default ContentSection;