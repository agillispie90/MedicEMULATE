import { createContext, useState } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import StartMenu from "./Screens/StartMenu";
import Root from "./layouts/Root";
import Quit from "./Screens/Quit";
import StartSimulation from "./Screens/StartSimulation";
import PlayScenario from "./Screens/PlayScenario";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<StartMenu />} />
      <Route path="start" element={<StartSimulation />} />
      <Route path="/start/:id" element={<PlayScenario />} />
      <Route path="quit" element={<Quit />} />
    </Route>
  )
);
export const AppContext = createContext(null);
function App() {
  const [currentScenario, setCurrentScenario] = useState(null);
  return (
    <AppContext.Provider value={{ currentScenario, setCurrentScenario }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
