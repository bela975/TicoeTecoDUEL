import React from "react";

export default function StatusBar({ label, value, type }) {
  return (
    <div className="bar-group">
      <label>{label}</label>
      <div className="bar">
        <div className={`fill ${type}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
