// libs
import React from "react";

// other
import iconsData from "./iconsData";

export default function SvgIcon({
  iconName,
  className = "",
  width = 24,
  height = 24,
  filled = "",
}) {
  
  const { viewBoxW, viewBoxH } = iconsData[iconName];
  const svg = iconsData[iconName].svg ?? iconsData[iconName];
  // const { viewBoxW = width, viewBoxH = height, svg } = iconsData[iconName] || {};

  if (!svg) {
    throw new Error(`Icon not found: ${iconName}`);
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={filled || "none"}
      viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
    >
      {svg}
    </svg>
  );
}
