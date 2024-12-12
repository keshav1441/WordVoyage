import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <header>
          <h1>Welcome to the Dashboard</h1>
        </header>
        <div className="content">
          <p>This is your dashboard content. Customize it as needed!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
