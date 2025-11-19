import React from "react";
import ReactDOM from "react-dom/client";
import LandingApp from "../LandingApp.tsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LandingApp />
  </React.StrictMode>,
);
