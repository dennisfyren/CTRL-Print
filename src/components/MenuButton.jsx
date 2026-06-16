import React, { useState } from "react";

function MenuButton({
  label,
  handleClick,
  Logo = null,
  className = "",
  isActive = false,
}) {
  return (
    <button
      className={`${className} ${isActive ? "bg-main-gray-hover text-main-bg" : "text-main-inactive hover:bg-main-gray-hover hover:text-main-bg"} h-13 w-[90%] rounded tracking-wider flex gap-2 items-center pl-2 duration-200 ease-in-out`}
      onClick={handleClick}
    >
      {Logo && <Logo size={20} />}
      {label}
    </button>
  );
}

export default MenuButton;
