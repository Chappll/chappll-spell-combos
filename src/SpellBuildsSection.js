import React, { useState, useEffect } from "react";
import spellbuilds from "./spellbuilds.json";
import spells from "./spells.json";
import ults from "./ults.json";
import bloods from "./bloods.json";
import BuildModal from "./BuildsModal";
import "./SpellsSection.css"; // Reuse styling

const schoolColors = {
  blood: "#8B0000",
  frost: "#00BFFF",
  chaos: "#9F2B68",
  unholy: "#556B2F",
  illusion: "#a5c0c2",
  lightning: "#FFD700"
};

const tierColors = {
  "S+": "#e600e6",
  S: "#ffcc00",
  A: "#00ffcc",
  B: "#00bfff",
  C: "#999999",
  D: "#ff4d4d"
};

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};


const normalizeName = (name) => name.toLowerCase().replace(/[\s_]/g, "");

const SpellBuildsSection = () => {
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedBloods, setSelectedBloods] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [selectedBuild, setSelectedBuild] = useState(null);
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray(spellbuilds);
    setBuilds(shuffled);
  }, []);

  const toggleSchool = (school) => {
    setSelectedSchools((prev) =>
      prev.includes(school) ? prev.filter((s) => s !== school) : [...prev, school]
    );
  };

  const toggleBlood = (blood) => {
    setSelectedBloods((prev) =>
      prev.includes(blood) ? prev.filter((b) => b !== blood) : [...prev, blood]
    );
  };

  const toggleTier = (tier) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const isBuildMatchingSelectedSchools = (build) => {
    if (selectedSchools.length === 0) return true;

    const allSpellNames = [build.spell1, build.spell2, build.spell3, build.ultspell];
    const matchingSpells = allSpellNames.map((name) => {
      const match =
        spells.find((s) => normalizeName(s.name) === normalizeName(name)) ||
        ults.find((u) => normalizeName(u.name) === normalizeName(name));
      return match?.school;
    });

    return selectedSchools.some((school) => matchingSpells.includes(school));
  };

  const isBuildMatchingSelectedBloods = (build) => {
    if (selectedBloods.length === 0) return true;
    return selectedBloods.some((blood) =>
      build.blood.map(normalizeName).includes(normalizeName(blood))
    );
  };

  const isBuildMatchingSelectedTiers = (build) => {
    if (selectedTiers.length === 0) return true;
    return selectedTiers.includes(build.tier);
  };

  const getSpellOrUlt = (name) => {
    return (
      spells.find((s) => normalizeName(s.name) === normalizeName(name)) ||
      ults.find((u) => normalizeName(u.name) === normalizeName(name))
    );
  };

  const getBloodImage = (bloodName) => {
    return bloods.find((b) => normalizeName(b.name) === normalizeName(bloodName))?.image;
  };

  const getGradientBackground = (build) => {
    const spellSchools = [build.spell1, build.spell2, build.spell3, build.ultspell]
      .map((name) => getSpellOrUlt(name)?.school)
      .filter(Boolean);
    const uniqueColors = [...new Set(spellSchools.map((school) => schoolColors[school]))];
    return `linear-gradient(45deg, ${uniqueColors.join(", ")})`;
  };

  const filteredBuilds = builds.filter(
    (build) =>
      isBuildMatchingSelectedSchools(build) &&
      isBuildMatchingSelectedBloods(build) &&
      isBuildMatchingSelectedTiers(build)
  );

  return (
    <div className="spells-section">
      <h2>Spell Builds</h2>

      <div className="spell-filters">
        {Object.keys(tierColors).map((tier) => (
          <button
            key={tier}
            onClick={() => toggleTier(tier)}
            style={{
              borderColor: tierColors[tier],
              color: selectedTiers.includes(tier) ? "#fff" : tierColors[tier],
              backgroundColor: selectedTiers.includes(tier) ? tierColors[tier] : "transparent"
            }}
          >
            {tier}
          </button>
        ))}
      </div>
      
      <div className="spell-filters">
        {Object.keys(schoolColors).map((school) => (
          <button
            key={school}
            onClick={() => toggleSchool(school)}
            style={{
              borderColor: schoolColors[school],
              color: selectedSchools.includes(school)
                ? "#fff"
                : schoolColors[school],
              backgroundColor: selectedSchools.includes(school)
                ? schoolColors[school]
                : "transparent"
            }}
          >
            {school.charAt(0).toUpperCase() + school.slice(1)}
          </button>
        ))}
      </div>
      <div className="blood-filters">
        {bloods.map((blood) => (
          <img
            key={blood.name}
            src={blood.image}
            alt={blood.name}
            className={`blood-filter-icon ${selectedBloods.includes(blood.name) ? "selected" : ""}`}
            onClick={() => toggleBlood(blood.name)}
          />
        ))}
      </div>

      <div className="spells-build-grid">
        {filteredBuilds.map((build, index) => (
          <div
            className="spell-card"
            key={index}
            onClick={() => setSelectedBuild(build)}
            style={{background: getGradientBackground(build), padding: "5px", cursor: "pointer", position: "relative"}}
          >
          {build.change && (
            <div
              style={{
                position: "absolute",
                top: "4px",
                left: "4px",
                fontSize: "18px",
                background: "rgba(0,0,0,0.6)",
                borderRadius: "4px",
                padding: "2px 6px",
                color:
                  build.change === "up"
                    ? "#00ff00"   // green
                    : build.change === "down"
                    ? "#ff4d4d"   // red
                    : "#ffd700", // gold for new
                fontWeight: "bold",
                zIndex: 2
              }}
              title={
                build.change === "up"
                  ? "Build improved"
                  : build.change === "down"
                  ? "Build downgraded"
                  : "New build"
              }
            >
              {build.change === "up" && "↑"}
              {build.change === "down" && "↓"}
              {build.change === "new" && "★"}
            </div>
          )}
            <div style={{background: "black", padding:"5px"}}>
              <h3 style={{ textShadow: "0 0 6px rgba(0,0,0,0.9)"}}>{build.buildname}</h3>
              <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "0.5rem"}}>
                {[build.spell1, build.spell2, build.spell3, build.ultspell].map((spell, i) => (
                  <img
                    key={i}
                    src={getSpellOrUlt(spell)?.image}
                    alt={spell}
                    style={{ width: "45px", height: "40px", borderRadius: "4px" }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                {build.blood.map((blood, i) => (
                  <img
                    key={i}
                    src={getBloodImage(blood)}
                    alt={blood}
                    style={{ width: "40px", height: "40px", borderRadius: "4px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBuild && (
        <BuildModal 
        build={selectedBuild} 
        onClose={() => setSelectedBuild(null)} 
        gradient={getGradientBackground(selectedBuild)} 
      />
      )}
    </div>
  );
};

export default SpellBuildsSection;
