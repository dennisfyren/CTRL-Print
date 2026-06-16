import React from "react";
import Brandlarm from "./Brandlarm";
import Inbrottslarm from "./Inbrottslarm";
import CE from "./CE";
import Preview from "./Preview";

function Protocol({ page }) {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 h-full animate-fade-in">
      <div className="2xl:border-r border-gray-300 dark:border-main-gray-hover py-10 overflow-y-scroll no-scrollbar">
        {page === "fire" && <Brandlarm />}
        {page === "breakin" && <Inbrottslarm />}
        {page === "ce" && <CE />}
      </div>
      <div className="p-10 hidden 2xl:block overflow-scroll no-scrollbar">
        <Preview />
      </div>
    </div>
  );
}

export default Protocol;
