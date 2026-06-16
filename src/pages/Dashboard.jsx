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
    dashboard: () => (
      <Quickstart userSettings={userSettings} setOpen={setOpen} />
    ),
    builder: () => <Builder />,
    fire: () => <Protocol page={"fire"} />,
    breakin: () => <Protocol page={"breakin"} />,
    ce: () => <Protocol page={"ce"} />,
    settings: () => (
      <Settings userSettings={userSettings} setUserSettings={setUserSettings} />
    ),
    customers: () => <Customers />,
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
        {pages[open]?.()}
      </main>
    </div>
  );
}

export default Dashboard;
