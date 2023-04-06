import React, { useMemo } from "react";
import { resizeImgSetting } from "utils/general";

export const Image = ({ source, onClick }) => {
  const { optimizeUrl, optimizeWidth, optimizeHeight } = useMemo(() => resizeImgSetting(source), []);

  return (
    <img
      alt={source.alt || ""}
      src={optimizeUrl}
      width={optimizeWidth}
      height={!optimizeHeight ? "auto" : optimizeHeight}
      loading="lazy"
      onClick={onClick}
    />
  );
};