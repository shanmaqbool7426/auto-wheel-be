"use client"
import React from 'react';

const Select = ({ options, value, onChange, id, className, ariaLabel }) => {
  return (
    <div className="select-custom">
      <select
        className={className || "form-select form-select-sm"}
        aria-label={ariaLabel || "Select an option"}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
