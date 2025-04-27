import React from "react";
import spells from "./spells.json";
import ults from "./ults.json";
import bloods from "./bloods.json";
import armour from "./armour.json";
import amulets from "./amulets.json";
import passives from "./passives.json";
import elixirs from "./elixirs.json";
import coatings from "./coating.json";
import "./modal.css";

const normalizeName = (name) => name.toLowerCase().replace(/[\s_]/g, "");

const getImage = (name, list, type = "") => {
  const item = list.find((item) => normalizeName(item.name) === normalizeName(name));
  if (!item?.image) return null;

  // Add missing extension if needed (common for armour and amulets)
  if ((type === "amulet" || type === "armour") && !item.image.includes(".")) {
    return `${item.image}.webp`;
  }

  return item.image;
};

const getItemImage = (name, data) => {
  if (!name || !Array.isArray(data)) return "";
  const lowerName = name.toLowerCase();
  const item = data.find((item) => item.name?.toLowerCase() === lowerName);
  return item?.image || "";
};

const getSpell = (name) =>
  spells.find((s) => normalizeName(s.name) === normalizeName(name)) ||
  ults.find((u) => normalizeName(u.name) === normalizeName(name));

  const tierColors = {
    "S+": "#e600e6", // Bright purple
    S: "#ffcc00",     // Gold
    A: "#00ffcc",     // Aqua
    B: "#00bfff",     // Blue
    C: "#999999",     // Grey
    D: "#ff4d4d"      // Red
  };

const BuildModal = ({ build, onClose, gradient }) => {
  if (!build) return null;

  const tierColor = tierColors[build.tier?.toUpperCase()] || "#ccc";

  return (
    <div className="build-modal-overlay" onClick={onClose} style={{ borderBottom: `3px solid transparent`, borderLeft: `3px solid transparent`}}>
      <div style={{background: gradient, padding: "20px"}}>
      <div className="build-modal" onClick={(e) => e.stopPropagation() } style={{ backgroundColor: "black" }}>
        <button className="close-button" onClick={onClose}>×</button>

        <h2 style={{ color: "#e64565" }}>{build.buildname}</h2>
        <p style={{ color: "#add8e6" }}>by {build.author}</p>
        <p style={{ marginTop: "-0.5rem", marginBottom: "0.5rem", fontWeight: "bold", color: "#ccc" }}>
          <span style={{ color: tierColor }}>Tier: {build.tier}</span> <br></br>
          Best in: {build.content}
        </p>
        <p>{build.description}</p>

        {/* Spells + Ult */}
        <div className="modal-row">
          {[build.spell1, build.spell2, build.spell3, build.ultspell].map((name, idx) => (
            <img
              key={idx}
              src={getSpell(name)?.image || "/images/fallback.png"}
              alt={name}
              className="modal-icon"
              onError={(e) => (e.target.style.display = "none")}
            />
          ))}
        </div>

        {/* Bloods */}
        <div style={{}}>
          {build.blood.map((b, i) => (
            <img
              key={i}
              src={getImage(b, bloods) || "/images/fallback.png"}
              alt={b}
              style={{height: "64px"}}
              onError={(e) => (e.target.style.display = "none")}
            />
          ))}
          <br></br>
          <span className="variation-text">Blood Variation: {build.bloodvariation}</span>
        </div>

        {/* Armour / Amulet / Passives */}
        <div className="modal-row">
          <img
            src={getImage(build.armour, armour, "armour")}
            alt={build.armour}
            className="modal-icon"
            onError={(e) => (e.target.style.display = "none")}
          />
          <img
            src={getImage(build.amulet, amulets, "amulet")}
            alt={build.amulet}
            className="modal-icon"
            onError={(e) => (e.target.style.display = "none")}
          />
          <img
              src={getItemImage(build.elixir, elixirs)}
              alt={build.elixir}
              title={build.elixir.replace(/_/g, " ")}
              className="modal-icon"
            />
          <img
              src={getItemImage(build.coating, coatings)}
              alt={build.coating}
              title={build.coating.replace(/_/g, " ")}
              className="modal-icon"
            />
          </div>

          <div className="modal-row">
          {build.passives.map((p, i) => (
            <img
              key={i}
              src={getImage(p, passives)}
              alt={p}
              className="modal-icon"
              onError={(e) => (e.target.style.display = "none")}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildModal;
