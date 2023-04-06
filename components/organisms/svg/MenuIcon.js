import React from "react";

const MenuIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width || "100%"}
      height={height || "100%"}
      viewBox="0 0 512 380.05"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="st0"
        d="M32,0h448c17.67,0,32,14.33,32,32s-14.33,32-32,32H32C14.33,64,0,49.67,0,32S14.33,0,32,0z"
      />
      <path
        className="st0"
        d="M32,158.02h448c17.67,0,32,14.33,32,32s-14.33,32-32,32H32c-17.67,0-32-14.33-32-32S14.33,158.02,32,158.02z"
      />
      <path
        className="st0"
        d="M32,316.05h448c17.67,0,32,14.33,32,32s-14.33,32-32,32H32c-17.67,0-32-14.33-32-32S14.33,316.05,32,316.05z"
      />
    </svg>
  );
};

export default MenuIcon;
