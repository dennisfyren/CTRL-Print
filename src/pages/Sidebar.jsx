import React, { useState } from "react";
import MenuButton from "../components/MenuButton";
import logo from "../assets/logoPNG.png";
import { Settings, Home, FileText, FilePlus } from "lucide-react";

function Sidebar({ open, setOpen }) {
  return (
    <div className="flex flex-col h-screen w-100 bg-main-dark-gray">
      <div className="bg-main-orange w-full flex justify-center py-6 mb-8">
        <img className="h-20" src={logo}></img>
      </div>
      <div className=" flex flex-col gap-2 pl-8 flex-1">
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
        <div className="flex flex-col gap-2 mt-10">
          <MenuButton
            label={"Brandlarm"}
            Logo={FileText}
            handleClick={() => setOpen("fire")}
            isActive={open === "fire"}
          />
          <MenuButton
            label={"Inbrottslarm"}
            Logo={FileText}
            handleClick={() => setOpen("breakin")}
            isActive={open === "breakin"}
          />
          <MenuButton
            label={"CE-Märkning"}
            Logo={FileText}
            handleClick={() => setOpen("ce")}
            isActive={open === "ce"}
          />
        </div>
        <MenuButton
          label={"Settings"}
          Logo={Settings}
          className="mt-auto mb-16 bg-transparent"
          handleClick={() => setOpen("settings")}
          isActive={open === "settings"}
        />
      </div>
    </div>
  );
}

export default Sidebar;
