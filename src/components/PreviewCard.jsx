import React from "react";
import DisplayText from "./displayData/DisplayText";

function PreviewCard({ data, key }) {
  const type = data?._meta?.["control-type"]?.type;
  return (
    <div>
      {type === "radio" && <p>radio</p>}
      {type === "checkbox" && <p>Checkbox</p>}
      {type !== "radio" && type !== "checkbox" && (
        <DisplayText data={data} key={key} />
      )}
    </div>
  );
}

export default PreviewCard;
