import React from "react";

function DisplayText({ data, key }) {
  console.log(data);
  return (
    <div key={key}>
      {Object.values(data).map((value) =>
        Object.entries(value)
          .filter(([label]) => label !== "_meta")
          .map(([label, entry]) => (
            <p>
              {label}: {entry}
            </p>
          )),
      )}
    </div>
  );
}

export default DisplayText;
