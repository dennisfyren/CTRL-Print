import React from "react";

function Button({
  label,
  handleClick,
  className = "w-50",
  Logo = null,
  logoSize = 20,
}) {
  return (
    <button
      className={`${className} relative bg-red-500 hover:bg-red-700 rounded px-4 py-2 text-main-bg text-sm font-semibold`}
      onClick={handleClick}
    >
      {Logo && <Logo size={logoSize} className="absolute left-1 self-center" />}
      {label}
    </button>
  );
}

export default Button;
