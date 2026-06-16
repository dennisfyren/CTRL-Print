import React from "react";
import { Construction } from "lucide-react";

function Customers() {
  return (
    <div className="p-10 animate-fade-in">
      <h1 className="flex gap-2 text-2xl dark:text-main-text items-center">
        <Construction className="text-main-orange" size={45} />
        Under utveckling...
      </h1>
    </div>
  );
}

export default Customers;
