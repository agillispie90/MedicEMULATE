import { useContext } from "react";
import { AppContext } from "../App";
import ECGMonitor from "../components/Monitor";
export default function PlayScenario() {
  const ecgParameters = {
    pWave: { duration: 0.06, amplitude: 0.4 },
    prInterval: { duration: 0.04 },
    qrsComplex: { duration: 0.06, amplitude: 1.4 },
    stSegment: { duration: 0.08, height: 0.1 },
    tWave: { duration: 0.04, amplitude: 0.4 },
  };
  const { currentScenario } = useContext(AppContext);
  return (
    <div>
      <h1>ECG Sim</h1>

      <ECGMonitor
        ecgParameters={ecgParameters}
        pulseRate={120}
        svgWidth={1000}
        svgHeight={300}
      />
    </div>
  ); //
}
