import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Builder from "./Builder";
import Brandlarm from "./Brandlarm";
import Inbrottslarm from "./Inbrottslarm";
import CE from "./CE";
import Settings from "./Settings";
import useLocalStorage from "../hooks/useLocalStorage";
import useSessionStorage from "../hooks/useSessionStorage";
import Quickstart from "./Quickstart";
import Customers from "./Customers";
import Protocol from "./Protocol";
import { useAuth } from "../hooks/useAuth";
import Preview from "./Preview";
import About from "./About";
import { Menu } from "lucide-react";
import logo from "../assets/logoPNG.png";

function Dashboard({ isDark, setIsDark, logout, onSet }) {
  const [open, setOpen] = useSessionStorage("dashboard_open", "dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastProtocol, setLastProtocol] = useSessionStorage(
    "last_protocol_type",
    "fire",
  );
  const [userSettings, setUserSettings] = useLocalStorage("userSettings", {
    name: "",
    company: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
    logo: "",
  });

  useEffect(() => {
    if (["fire", "breakin", "ce"].includes(open)) {
      setLastProtocol(open);
    }
  }, [open]);

  const pages = {
    dashboard: () => (
      <Quickstart userSettings={userSettings} setOpen={setOpen} />
    ),
    builder: () => <Builder />,
    fire: () => (
      <Protocol page={"fire"} userSettings={userSettings} setOpen={setOpen} />
    ),
    breakin: () => (
      <Protocol
        page={"breakin"}
        userSettings={userSettings}
        setOpen={setOpen}
      />
    ),
    ce: () => <Protocol page={"ce"} />,
    settings: () => (
      <Settings
        userSettings={userSettings}
        setUserSettings={setUserSettings}
        onSet={onSet}
      />
    ),
    customers: () => <Customers />,
    preview: () => (
      <Preview
        setOpen={setOpen}
        userSettings={userSettings}
        page={lastProtocol}
      />
    ),
    about: () => <About />,
  };

  return (
    <div className="flex flex-col lg:flex-row bg-main-bg dark:bg-main-bg-dark transition-colors duration-500 ease-in-out h-screen relative overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className="lg:hidden relative bg-main-orange w-full h-20 flex justify-center items-center cursor-pointer"
        onClick={() => setOpen("dashboard")}
      >
        <button
          className="absolute w-20 h-full left-4 text-white"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(true);
          }}
        >
          <Menu size={24} />
        </button>
        <img className="h-12" src={logo} alt="logo"></img>
      </div>

      <Sidebar
        open={open}
        setOpen={setOpen}
        isDark={isDark}
        setIsDark={setIsDark}
        logout={logout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="p-5 flex-1 transition-colors duration-200 ease-in-out overflow-y-auto">
        {pages[open]?.()}
      </main>
    </div>
  );
}

export default Dashboard;
