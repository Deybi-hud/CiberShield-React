// src/components/atoms/Button.jsx
import "../../styles/button.css";

export const Button = ({ text, onClick }) => (
  <button className="button" onClick={onClick}>{text}</button>
);
