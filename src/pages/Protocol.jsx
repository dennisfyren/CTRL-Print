import React from "react";
import Brandlarm from "./Brandlarm";
import Inbrottslarm from "./Inbrottslarm";
import CE from "./CE";
import Preview from "./Preview";
import Button from "../components/Button";
import { useDataContext } from "../hooks/DataContext";

function Protocol({ page, userSettings, setOpen }) {
  const { setData } = useDataContext();

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 h-full animate-fade-in">
      <div className="relative 2xl:border-r border-gray-300 dark:border-main-gray-hover py-10 overflow-y-scroll no-scrollbar">
        {page === "fire" && <Brandlarm userSettings={userSettings} />}
        {page === "breakin" && <Inbrottslarm userSettings={userSettings} />}
        {page === "ce" && <CE />}
      </div>
      <div className="relative p-10 hidden 2xl:block overflow-scroll no-scrollbar">
        <Preview userSettings={userSettings} page={page} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Protocol;
