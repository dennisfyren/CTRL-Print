import React, { useState } from "react";

function SidebarFire() {
  const [active, setActive] = useState("Kontaktuppgifter");

  const categories = ["Kontaktuppgifter", "Anläggning", "Centralapparat"];

  function handleClick({ section }) {
    setActive(section);
  }

  return (
    <div className="ml-8 pl-2 pt-2 animate-fade-in ">
      <h1 className="mb-4 text-xl text-main-bg cursor-default">Brandlarm</h1>
      <ul>
        {categories.map((item) => (
          <li
            key={item}
            className={`${active === item ? "text-main-text origin-left" : "text-main-inactive hover:text-main-bg"} my-2  transition-all duration-100 cursor-pointer`}
            onClick={() => setActive(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarFire;
