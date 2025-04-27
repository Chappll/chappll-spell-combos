import React from "react";
import "./Jumbotron.css";
import logo from  "./images/logo-arena.png";

const Jumbotron = () => {
  return (
    <div className="jumbotron">
      <img src={logo} alt="Vampire Game Logo" className="logo" />
      <h1>V Rising Meta</h1>
      <p>Embrace the night. Master the dark arts.</p>
    </div>
  );
};

export default Jumbotron;