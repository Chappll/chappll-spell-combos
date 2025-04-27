// MenuBar.tsx
import React from "react";
import "./MenuBar.css";

const MenuBar = ({ onSelect }) => {
  const sections = ["Spells", "Spell Builds"];

  return (
    <div className="menu-bar">
      {sections.map((title) => (
        <button
          key={title}
          className="menu-button"
          onClick={() => onSelect(title)}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default MenuBar;