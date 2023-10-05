import { NavLink } from "react-router-dom";

export default function Quit() {
  return (
    <div>
      <ul>
        <li>Hello</li>
        <li>
          <NavLink to="/">Go Away</NavLink>Go away
        </li>
      </ul>
    </div>
  );
}
