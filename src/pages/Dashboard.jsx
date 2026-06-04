import React from "react";
import Sidebar from "./Sidebar";
import Quickstart from "./Quickstart";

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <Quickstart />
    </div>
  );
}

export default Dashboard;
