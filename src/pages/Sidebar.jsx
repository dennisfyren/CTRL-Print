import React from "react";
import MenuButton from "../components/MenuButton";
import logo from "../assets/logoPNG.png";
import { Settings, Home, FilePlus, X } from "lucide-react";
import Button from "../components/Button";

function Sidebar({
  open,
  setOpen,
  isDark,
  setIsDark,
  logout,
  sidebarOpen,
  setSidebarOpen,
}) {
  function handleNav(page) {
    setOpen(page);
    setSidebarOpen(false);
  }

  return (
    <div
      className={`
        flex flex-col h-screen w-64 bg-main-dark-gray
        fixed inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-auto lg:w-100
      `}
    >
      <X
        className="lg:hidden absolute right-4 top-4 cursor-pointer text-main-text"
        size={24}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className="bg-main-orange w-full flex justify-center py-6 mb-8 cursor-pointer"
        onClick={() => handleNav("dashboard")}
      >
        <img className="h-20" src={logo} alt="logo"></img>
      </div>
      <div className="flex flex-col gap-2 pl-8 flex-1 items-start">
        <MenuButton
          label={"Dashboard"}
          Logo={Home}
          handleClick={() => handleNav("dashboard")}
          isActive={open === "dashboard"}
        />
        <MenuButton
          label={"Protocol Builder"}
          Logo={FilePlus}
          handleClick={() => handleNav("builder")}
          isActive={open === "builder"}
        />
        <MenuButton
          label={"Inställningar"}
          Logo={Settings}
          className="mt-auto mb-4 bg-transparent"
          handleClick={() => handleNav("settings")}
          isActive={open === "settings"}
        />
        <Button
          label={"Logga ut"}
          className="bg-blue-500 hover:bg-blue-600 w-50 h-12 mb-6"
          handleClick={() => logout()}
        />
      </div>
      <div className="flex items-center">
        <div className="flex flex-col mb-10 ml-10 gap-2">
          <p className="text-main-inactive text-xs ml-1">
            {isDark ? "Ljust läge" : "Mörkt läge"}
          </p>
          <button
            className="relative rounded-full h-6 bg-zinc-300 w-16"
            onClick={() => setIsDark(!isDark)}
          >
            <div
              className={`absolute h-5 w-5 bg-main-dark-gray rounded-full mx-[0.1rem] translate-transform duration-200 self-center ${isDark ? "translate-x-10" : "translate-x-0"} `}
            ></div>
          </button>
        </div>
        <Button
          label={"About"}
          className="ml-auto mb-4 mr-4 hover:text-main-inactive"
          handleClick={() => handleNav("about")}
        />
      </div>
    </div>
  );
}

export default Sidebar;
