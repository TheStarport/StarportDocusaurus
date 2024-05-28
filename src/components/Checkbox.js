
import React from "react";

const Checkbox = ({ label, isSelected, onChange }) => (
  <div>
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onChange}
      />
      {label}
    </label>
  </div>
);

export default Checkbox;

