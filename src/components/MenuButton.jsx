import React from "react";

function MenuButton({ label, handleClick, Logo = null, className = "" }) {
  return (
    <button
      className={`${className} h-10 w-50 rounded text-white tracking-wider  hover:bg-main-orange-hover flex gap-2 items-center pl-2`}
      onClick={handleClick}
    >
      {Logo && <Logo size={16} />}
      {label}
    </button>
  );
}

export default MenuButton;
