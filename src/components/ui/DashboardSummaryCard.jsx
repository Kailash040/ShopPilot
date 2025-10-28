import React from 'react';
// import './DashboardSummaryCard.css'; // Optional CSS file

const DashboardSummaryCard = ({ 
  title = "All Orders",
  value = 0,
  subtitle = "This Week",
  status = "default", // "default", "pending", "completed", or custom
  icon, // Optional icon component
  onClick, // Optional click handler
  className = "" // Additional CSS classes
}) => {
  return (
    <div 
      className={`dashboard-summary-card ${status} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="card-content">
        {icon && <div className="card-icon">{icon}</div>}
        
        <div className="card-text">
          <h3 className="card-title">{title}</h3>
          <p className="card-value">{value}</p>
          <p className="card-subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryCard;