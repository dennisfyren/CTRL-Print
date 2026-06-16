import React, { useState } from "react";
import Button from "./Button";

function GeneralCard({ label, className = "", handleClick }) {
  return (
    <div
      className={`${className} flex flex-col rounded p-4 transition-all duration-300 w-70 border dark:border-white/10 border-gray-300 h-26 items-center justify-center cursor-default`}
      onClick={handleClick}
    >
      <h1 className={`text-xl text-main-text`}>{label}</h1>
    </div>
  );
}

export default GeneralCard;
