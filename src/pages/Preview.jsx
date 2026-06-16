import React from "react";

function Preview() {
  return (
    <div className="">
      <button
        className="absolute top-12 right-12 h-10 w-30 bg-blue-500 hover:bg-blue-700 rounded text-main-text"
        onClick={() => window.print()}
      >
        Print
      </button>
      <div className="">
        <p className="dark:text-main-text">Preview window</p>
      </div>
    </div>
  );
}

export default Preview;
