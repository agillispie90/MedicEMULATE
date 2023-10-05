import { NavLink } from "react-router-dom";
import { useContext } from "react";
import styles from "../styles/Components/ScenarioListItem.module.css";
import { AppContext } from "../App";

export default function ScenarioListItem({ title, description, data }) {
  const { setCurrentScenario } = useContext(AppContext);
  return (
    <NavLink onClick={() => setCurrentScenario(data)} to={`./${data.id}`}>
      <li className={styles.scenarioListItem}>
        <h3 style={{ textDecoration: "none" }}>{title}</h3>
        <p>{description}</p>
      </li>
    </NavLink>
  );
}
