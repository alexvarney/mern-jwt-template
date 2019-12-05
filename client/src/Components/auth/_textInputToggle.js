import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

export default function TextInputToggle({ value, name, onChange, mask=null, type="text" }) {
  const [showInput, setInputState] = useState(false);
  const [isHovered, setHover] = useState(false);

  const openInput = () => {
      setInputState(true);
      setHover(false);
  }

  const style = {
    cursor: "pointer",
    padding: '0.3rem',
    borderRadius: '0.15rem'
  }

  const hoverStyle = {
      ...style,
    backgroundColor: "#e6f0ff",
  }

  const inputStyle = {
      maxWidth: '10rem',
      fontSize: '14px',
      padding: '0.25rem',
      textAlign: 'center',
      borderRadius: '0.1rem',
      border: '1px solid lightgrey',
      boxShadow: '3px 3px 3px 0px rgba(0,0,0,0.05)'
  }

  return (
    <>
      {showInput ? (
        <>
          <input autoFocus type={type} style={inputStyle} value={value} name={name} onChange={onChange} />
          <button className="btn btn-sm btn-secondary btn-outline"
            style={{ marginLeft: "0.5rem", cursor: 'pointer', fontSize: '12px' }}
            onClick={() => setInputState(false)}
          >
            Close
          </button>
        </>
      ) : (
        <span
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={openInput}
          style={isHovered ? hoverStyle : style}
        >
            {mask ? mask : value}
        </span>
      )}
    </>
  );
}
