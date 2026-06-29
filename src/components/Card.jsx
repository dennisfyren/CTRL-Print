import React, { useState } from "react";
import Button from "./Button";

function Card({ label, className = "", handleClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${className} flex flex-col rounded p-4 transition-all duration-300 w-70 border dark:border-white/10 border-gray-300 ${hover ? "h-36" : "h-36"}`}
    >
      <h1 className={`text-xl dark:text-main-text mb-5 cursor-default`}>
        {label}
      </h1>

      <div className="flex gap-4 mt-auto">
        <Button
          label={"Skapa ny"}
          className="bg-green-600 hover:bg-green-700 h-15 w-full animate-fade-in"
          handleClick={handleClick}
        />
        {/* <Button
            label={"Öppna"}
            className="bg-blue-500 hover:bg-blue-600 h-15 w-full animate-fade-in"
          /> */}
      </div>
    </div>
  );
}

export default Card;
