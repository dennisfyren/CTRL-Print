import React from "react";

function DisplayText({ data, number }) {
  if (!data) return null;

  const renderValue = (entry) =>
    Array.isArray(entry) ? entry.join(", ") : entry;

  const renderField = (value, index, count) => {
    if (typeof value !== "object" || value === null) return null;

    const prefix = number ? `${number}.${count} ` : "";

    if (value.label) {
      const isComment = value.label === "Notering";
      return (
        <p key={index} className={isComment ? "ml-2" : ""}>
          <span className="font-semibold">
            {prefix}
            {value.label}:
          </span>{" "}
          <span>{value.values ? renderValue(value.values) : ""}</span>
        </p>
      );
    }

    return Object.entries(value).map(([label, entry]) => {
      const isComment = label === "Notering";
      return (
        <p key={label} className={isComment ? "ml-4" : ""}>
          <span className="font-semibold">
            {prefix}
            {label}:
          </span>{" "}
          <span className={isComment ? "italic" : ""}>
            {renderValue(entry)}
          </span>
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col gap-1">
      {(() => {
        let count = 0;
        return Object.values(data).map((value, index) => {
          count++;
          return <div key={index}>{renderField(value, index, count)}</div>;
        });
      })()}
    </div>
  );
}

export default DisplayText;
