import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Builder from "./Builder";
import Brandlarm from "./Brandlarm";
import Inbrottslarm from "./Inbrottslarm";
import CE from "./CE";
import Settings from "./Settings";
import useLocalStorage from "../hooks/useLocalStorage";

function Dashboard({ isDark, setIsDark }) {
  const [open, setOpen] = useState("dashboard");
  const [userSettings, setUserSettings] = useLocalStorage("userSettings", {
    name: "",
    company: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
    website: "",
    logo: "",
  });

  const pages = {
    dashboard: <div>Dashboard</div>,
    builder: <Builder />,
    fire: <Brandlarm />,
    breakin: <Inbrottslarm />,
    ce: <CE />,
    settings: (
      <Settings userSettings={userSettings} setUserSettings={setUserSettings} />
    ),
  };

  return (
    <div className="flex bg-main-bg dark:bg-main-bg-dark transition-colors duration-500 ease-in-out">
      <Sidebar
        open={open}
        setOpen={setOpen}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <main className="p-5 flex-1 transition-colors duration-200 ease-in-out">
        {pages[open]}
      </main>
    </div>
  );
}

export default Dashboard;
