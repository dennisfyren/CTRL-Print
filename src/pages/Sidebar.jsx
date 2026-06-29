import React, { useState } from "react";
import MenuButton from "../components/MenuButton";
import logo from "../assets/logoPNG.png";
import { Settings, Home, FileText, FilePlus } from "lucide-react";
import SidebarFire from "./sidebar-selections/SidebarFire";
import Button from "../components/Button";

function Sidebar({ open, setOpen, isDark, setIsDark, logout }) {
  return (
    <div className="flex flex-col h-screen lg:w-100 w-50 bg-main-dark-gray">
      <div
        className="bg-main-orange w-full flex justify-center py-6 mb-8"
        onClick={() => setOpen("dashboard")}
      >
        <img className="h-20 cursor-pointer" src={logo}></img>
      </div>
      <div className="flex flex-col gap-2 pl-8 flex-1">
        <MenuButton
          label={"Dashboard"}
          Logo={Home}
          handleClick={() => setOpen("dashboard")}
          isActive={open === "dashboard"}
        />
        <MenuButton
          label={"Protocol Builder"}
          Logo={FilePlus}
          handleClick={() => setOpen("builder")}
          isActive={open === "builder"}
        />
        <MenuButton
          label={"Inställningar"}
          Logo={Settings}
          className="mt-auto mb-4 bg-transparent"
          handleClick={() => setOpen("settings")}
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
          className="ml-auto mr-4 hover:text-main-inactive"
          handleClick={() => {
            setOpen("about");
          }}
        />
      </div>
    </div>
  );
}

export default Sidebar;
