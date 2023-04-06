import React, { useRef, useEffect } from "react";

const AnchorSlice = ({ slice }) => {
  const anchorRef = useRef(null);

  useEffect(() => {
    window.addEventListener('load', () => {
      const anchorId = location.hash.substring(1);
      if(anchorId === slice.primary.anchor_id) {
        window.scrollTo(window.scrollX, anchorRef.current.offsetTop - 65);
      }
    });
  }, [slice]);

  return (
    <div id={slice.primary.anchor_id} ref={anchorRef}></div>
  )
}

export default AnchorSlice;