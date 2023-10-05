import { NavLink } from "react-router-dom";
import styles from "../styles/StartScreen.module.css";
import CenterMenu from "../components/CenterMenu";
import logo from "../assets/logo.png";
export default function StartMenu() {
  return (
    <div>
      <CenterMenu>
        <img className={styles.logo} src={logo} />
        <div className={styles.right}>
          <div className={styles.title}>
            <h1>
              Medi<span className={styles.logoText}>Emulate</span>
            </h1>
            <small className={styles.version}>Ver 0.0.1 (Alpha)</small>
          </div>
          <ul className={styles.startMenuList}>
            <li>
              <NavLink to={"start"}>Start Simulator</NavLink>
            </li>
            <li>
              <NavLink to={"quit"}>Create Simulation</NavLink>
            </li>
            <li>
              <NavLink to={"quit"}>Options</NavLink>
            </li>
            <li>
              <NavLink to={"quit"}>Quit Simulator</NavLink>
            </li>
          </ul>
        </div>
      </CenterMenu>
    </div>
  );
}
