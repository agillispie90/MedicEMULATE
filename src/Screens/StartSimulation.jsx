import React, { useState, useEffect } from "react";
import CenterMenu from "../components/CenterMenu";
import ScenarioListItem from "../components/ScenarioListItem";
import styles from "../styles/Screens/StartSimulation.module.css";
import { NavLink } from "react-router-dom";
import scenariosData from "../assets/scenarios.json"; // Import the JSON file
import { fs, path } from "@tauri-apps/api";
import { resourceDir } from "@tauri-apps/api/path";

export default function StartSimulation() {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    loadModsFromDirectory();
  }, []);

  const loadModsFromDirectory = async () => {
    const resource = await resourceDir();
    const directory = resource + "mods";
    let allScenarios = [...scenariosData.scenarios]; // Copy initial scenarios

    try {
      const modFiles = await fs.readDir(directory);
      for (const file of modFiles) {
        if (file.name.endsWith(".json")) {
          const filePath = await path.join(directory, file.name);
          const content = await fs.readTextFile(filePath);
          const customScenarios = JSON.parse(content).scenarios;
          allScenarios = [...allScenarios, ...customScenarios]; // Merge with custom scenarios
        }
      }
      // Sort the scenarios alphabetically by their title
      allScenarios.sort((a, b) => a.title.localeCompare(b.title));
      setScenarios(allScenarios); // Update the state with sorted scenarios
    } catch (error) {
      console.error("Error reading mod files:", error);
    }
  };

  return (
    <>
      <NavLink to="/">Go Home</NavLink>
      <CenterMenu style={{ justifyContent: "space-between" }}>
        <h1>Select a Simulation</h1>
        <div className={styles.scenarioSelectList}>
          <ul className={styles.scenarioList}>
            {scenarios.map((scenario, index) => (
              <ScenarioListItem
                data={scenario}
                key={index}
                title={scenario.title}
                description={scenario.description}
              />
            ))}
          </ul>
        </div>
      </CenterMenu>
    </>
  );
}
