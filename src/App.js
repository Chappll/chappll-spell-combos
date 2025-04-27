import React, { useState } from "react";
import MenuBar from "../src/MenuBar";
import Jumbotron from "./Jumbotron";
import SpellsSection from "./SpellsSection";
import SpellBuildsSection from "./SpellBuildsSection";
import './App.css';

const App = () => {
  const [selectedSection, setSelectedSection] = useState("Spells");

  const renderContent = () => {
    switch (selectedSection) {
      case "Basics":
        return <div>Welcome to the Basics section!</div>;
      case "Weapons":
        return <div>All about Weapons.</div>;
      case "Spells":
        return <SpellsSection/>;
      case "Spell Builds":
        return <SpellBuildsSection />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Jumbotron/>
      <MenuBar onSelect={setSelectedSection} />
      <div style={{ padding: "16px" }}>{renderContent()}</div>
    </div>
  );
};

export default App;