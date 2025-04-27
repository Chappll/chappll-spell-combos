// SpellsSection.js
import React, { useState } from "react";
import spellsData from "./spells.json";
import ultsData from "./ults.json";
import "./SpellsSection.css";

const schoolColors = {
  blood: "#8B0000",
  frost: "#00BFFF",
  chaos: "#9F2B68",
  unholy: "#556B2F",
  illusion: "#a5c0c2",
  lightning: "#FFD700"
};

const SpellsSection = () => {
  const [selectedSchool, setSelectedSchool] = useState("all");

  const filteredSpells =
    selectedSchool === "all"
      ? spellsData
      : spellsData.filter((spell) => spell.school === selectedSchool);

  const filteredUlts =
    selectedSchool === "all"
      ? ultsData
      : ultsData.filter((ult) => ult.school === selectedSchool);

  return (
    <div className="spells-section">
      <h2>Spells</h2>
      <div className="spell-filters">
        <button onClick={() => setSelectedSchool("all")}>All</button>
        {Object.keys(schoolColors).map((school) => (
          <button
            key={school}
            onClick={() => setSelectedSchool(school)}
            style={{ borderColor: schoolColors[school], color: schoolColors[school] }}
          >
            {school.charAt(0).toUpperCase() + school.slice(1)}
          </button>
        ))}
      </div>

      <div className="spells-grid">
        {filteredSpells.map((spell) => (
          <div
            className="spell-card"
            key={spell.name}
            style={{ boxShadow: `0 0 10px ${schoolColors[spell.school]}` }}
          >
            <img src={spell.image} alt={spell.name} className="spell-image" />
            <h3>{spell.name}</h3>
            <a href={spell.wiki} target="_blank" rel="noopener noreferrer">
              View on Wiki
            </a>
          </div>
        ))}
      </div>

      <h2>Ultimates</h2>
      <div className="spells-grid">
        {filteredUlts.map((ult) => (
          <div
            className="spell-card"
            key={ult.name}
            style={{ boxShadow: `0 0 10px ${schoolColors[ult.school]}` }}
          >
            <img src={ult.image} alt={ult.name} className="spell-image" />
            <h3>{ult.name}</h3>
            <a href={ult.wiki} target="_blank" rel="noopener noreferrer">
              View on Wiki
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpellsSection;
