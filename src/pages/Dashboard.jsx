import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Builder from "./Builder";
import Brandlarm from "./Brandlarm";
import Inbrottslarm from "./Inbrottslarm";
import CE from "./CE";
import Settings from "./Settings";
import useLocalStorage from "../hooks/useLocalStorage";
import Quickstart from "./Quickstart";
import Customers from "./Customers";
import Protocol from "./Protocol";
import { useAuth } from "../hooks/useAuth";
import Preview from "./Preview";

function Dashboard({ isDark, setIsDark, logout, onSet }) {
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
    dashboard: () => (
      <Quickstart userSettings={userSettings} setOpen={setOpen} />
    ),
    builder: () => <Builder />,
    fire: () => (
      <Protocol page={"fire"} userSettings={userSettings} setOpen={setOpen} />
    ),
    breakin: () => <Protocol page={"breakin"} />,
    ce: () => <Protocol page={"ce"} />,
    settings: () => (
      <Settings
        userSettings={userSettings}
        setUserSettings={setUserSettings}
        onSet={onSet}
      />
    ),
    customers: () => <Customers />,
    preview: () => <Preview setOpen={setOpen} userSettings={userSettings} />,
  };

  return (
    <div className="flex bg-main-bg dark:bg-main-bg-dark transition-colors duration-500 ease-in-out h-screen">
      <Sidebar
        open={open}
        setOpen={setOpen}
        isDark={isDark}
        setIsDark={setIsDark}
        logout={logout}
      />
      <main className="p-5 flex-1 transition-colors duration-200 ease-in-out">
        {pages[open]?.()}
      </main>
    </div>
  );
}

export default Dashboard;
