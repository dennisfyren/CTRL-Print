import React from "react";
import DisplayText from "./displayData/DisplayText";

function PreviewCard({
  title = "",
  number,
  data,
  className = "border border-t-2 mt-1 p-2",
}) {
  if (!data) return null;

  return (
    <div
      style={{ breakInside: "avoid" }}
      className={`${className} animate-fade-in`}
    >
      <h1 className="text-lg">
        {number && `${number}.`} {title}
      </h1>
      <div className="ml-4">
        <DisplayText data={data} number={number} />
      </div>
    </div>
  );
}

export default PreviewCard;
