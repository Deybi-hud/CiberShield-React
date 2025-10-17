import React from "react";
import '../../styles/atoms/Image.css';

function Image({ src, alt, className }) {
  return <img src={src} alt={alt} className={className} />;
}

export default Image;
