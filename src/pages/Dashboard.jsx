import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Builder from "./Builder";
import Brandlarm from "./Brandlarm";
import Inbrottslarm from "./Inbrottslarm";
import CE from "./CE";
import Settings from "./Settings";

function Dashboard() {
  const [open, setOpen] = useState("dashboard");
  const [userSettings, setUserSettings] = useState({});
  const pages = {
    dashboard: <div>Dashboard</div>,
    builder: <Builder />,
    fire: <Brandlarm />,
    breakin: <Inbrottslarm />,
    ce: <CE />,
    settings: <Settings />,
  };

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} />
      <main className="p-5 flex-1">{pages[open]}</main>
    </div>
  );
}

export default Dashboard;
