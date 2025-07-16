import React from "react";

const CustInput = ({ label, value, placeholder, setValue }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        type="text"
        className="input"
        placeholder={placeholder || "type here"}
        value={value ?? ""}
        onChange={setValue}
      />
    </fieldset>
  );
};

export default CustInput;
