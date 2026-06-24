import React from "react";

function Button({
  label,
  handleClick,
  className = "w-50 bg-blue-500 hover:bg-blue-600 relative",
  Logo = null,
  logoSize = 20,
  disabled = false,
}) {
  return (
    <button
      className={`${className}  rounded px-4 py-2 text-main-text text-sm font-semibold`}
      onClick={handleClick}
      disabled={disabled}
    >
      {Logo && <Logo size={logoSize} className="absolute left-2 self-center" />}
      {label}
    </button>
  );
}

export default Button;
