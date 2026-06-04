import React from "react";
import MenuButton from "../components/MenuButton";
import logo from "../assets/logoPNG.png";
import { Settings, Home, FileText } from "lucide-react";

function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-100 bg-main-dark-gray">
      <div className="bg-main-orange w-full flex justify-center py-6 mb-8">
        <img className="h-20" src={logo}></img>
      </div>
      <div className=" flex flex-col gap-2 pl-8 flex-1">
        <MenuButton label={"Dashboard"} Logo={Home} />
        <MenuButton label={"Brandlarm"} Logo={FileText} />
        <MenuButton label={"Inbrottslarm"} Logo={FileText} />
        <MenuButton label={"CE-Märkning"} Logo={FileText} />
        <MenuButton
          label={"Settings"}
          Logo={Settings}
          className="mt-auto mb-16 bg-transparent"
        />
      </div>
    </div>
  );
}

export default Sidebar;
