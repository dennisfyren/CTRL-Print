import React from "react";

function DisplayText({ data, number }) {
  if (!data) return null;

  const renderValue = (entry) => {
    if (!Array.isArray(entry)) return entry;

    return entry
      .map((item) =>
        typeof item === "object" && item !== null ? item.value : item,
      )
      .join(", ");
  };

  const renderField = (value, index, count) => {
    const prefix = number ? `${number}.${count} ` : "";

    if (typeof value !== "object" || value === null) {
      return (
        <p key={index}>
          <span className="font-semibold">{prefix}</span>
          <span>{renderValue(value)}</span>
        </p>
      );
    }

    if (value.label) {
      const isComment = value.label === "Notering";
      const extraText = value.extra ? renderValue(value.extra) : null;
      const isNormalizedList =
        Array.isArray(value.values) &&
        value.values.some(
          (item) =>
            typeof item === "object" && item !== null && "status" in item,
        );

      if (isNormalizedList) {
        return (
          <div key={index} className="flex flex-col gap-1">
            <p>
              <span className="font-semibold">
                {prefix}
                {value.label}:
              </span>
            </p>
            {value.values.map((item, i) => (
              <div key={i} className="ml-2 ">
                <p>
                  <span className="font-semibold">{item.value}</span>
                  {" — "}
                  <span>{item.status}</span>
                </p>
                {item.status === "Åtgärd behövs" && item.comment && (
                  <p className="ml-2 italic">Notering: {item.comment}</p>
                )}
              </div>
            ))}
          </div>
        );
      }

      const valueText = value.values ? renderValue(value.values) : "";

      return (
        <p key={index} className={isComment ? "ml-2" : ""}>
          <span className="font-semibold">
            {prefix}
            {value.label}:
          </span>{" "}
          <span>{valueText}</span>
          {extraText ? (
            <span className="italic ml-1">({extraText})</span>
          ) : null}
        </p>
      );
    }

    const filteredEntries = Object.entries(value).filter(
      ([label]) => label !== "extra",
    );
    const extraText = value.extra ? renderValue(value.extra) : null;

    return filteredEntries.map(([label, entry], entryIndex) => {
      const isComment = label === "Notering";
      const showExtra = extraText && entryIndex === filteredEntries.length - 1;
      return (
        <p key={label} className={isComment ? "ml-4" : ""}>
          <span className="font-semibold">
            {prefix}
            {label}:
          </span>{" "}
          <span className={isComment ? "italic" : ""}>
            {renderValue(entry)}
          </span>
          {showExtra ? <span className="italic ml-1">{extraText}</span> : null}
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
