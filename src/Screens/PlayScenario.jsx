import { useContext } from "react";
import { AppContext } from "../App";
import ECGMonitor from "../components/Monitor";
import styles from "../styles/Screens/PlayScenario.module.css";
export default function PlayScenario() {
  const ecgParameters = {
    pWave: { duration: 0.08, amplitude: 0.8 },
    prInterval: { duration: 0.04 },
    qrsComplex: { duration: 0.08, amplitude: 1.4 },
    stSegment: { duration: 0.15, height: 0 },
    tWave: { duration: 0.06, amplitude: 0.4 },
  };
  const { currentScenario } = useContext(AppContext);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.content}>
            <h2>Patient</h2>
            <div className={styles.info}>
              <h3>Patient Name</h3>
              <p>{currentScenario?.demographics?.name}</p>
            </div>
            <div className={styles.info}>
              <h3>Gender</h3>
              <p>{currentScenario?.demographics?.gender}</p>
            </div>
            <div className={styles.info}>
              <h3>Age</h3>
              <p>
                {currentScenario?.demographics?.age?.value}{" "}
                {currentScenario?.demographics?.age?.descriptor}
              </p>
            </div>
            <div className={styles.info}>
              <h3>Weight</h3>
              <p>
                {currentScenario?.demographics?.weight?.value}{" "}
                {currentScenario?.demographics?.weight?.descriptor}
              </p>
            </div>
          </div>
          {/* SCENE */}
          <div className={styles.content}>
            <h2>Scene</h2>
            <div className={styles.info}>
              <h3>Time (HH:MM)</h3>
              <p>
                {currentScenario?.scene?.timeHour}:
                {currentScenario?.scene?.timeMinutes}
              </p>
            </div>
            <div className={styles.info}>
              <h3>Location Type</h3>
              <p>{currentScenario?.scene?.structure}</p>
            </div>
            <div className={styles.info}>
              <h3>Weather</h3>
              <p>{currentScenario?.scene?.weather}</p>
            </div>
          </div>

          <div className={styles.content}>
            <h2>Log</h2>
          </div>
        </div>
        <div className={styles.center}></div>
        <div className={styles.right}>
          <div className={styles.content}>
            <h2>Actions</h2>
          </div>
          <div className={styles.content}>
            <h2>Vitals</h2>
            <div className={styles.vitalSign}>
              <h3>BP</h3>
              <strong
                style={{
                  color: "limegreen",
                  fontSize: 32,
                  fontFamily: "sans-serif",
                }}
              >
                {currentScenario?.initialVitals?.sbp}/
                {currentScenario?.initialVitals?.dbp}
              </strong>
            </div>
            <div className={styles.vitalSign}>
              <h3>HR</h3>
              <strong
                style={{ color: "red", fontSize: 32, fontFamily: "sans-serif" }}
              >
                {currentScenario?.initialVitals?.pulse}
              </strong>
            </div>
            <div className={styles.vitalSign}>
              <h3>SPO2</h3>
              <strong
                style={{
                  color: "cornflowerblue",
                  fontSize: 32,
                  fontFamily: "sans-serif",
                }}
              >
                {currentScenario?.initialVitals?.pulseOx}%
              </strong>
            </div>
            <div className={styles.vitalSign}>
              <h3>CO2</h3>
              <strong
                style={{
                  color: "orange",
                  fontSize: 32,
                  fontFamily: "sans-serif",
                }}
              >
                {currentScenario?.initialVitals?.co2} mmHg
              </strong>
            </div>
            <div className={styles.vitalSign}>
              <h3>CO</h3>
              <strong
                style={{
                  color: "white",
                  fontSize: 32,
                  fontFamily: "sans-serif",
                }}
              >
                {currentScenario?.initialVitals?.co}%
              </strong>
            </div>
            <div className={styles.vitalSign}>
              <h3>Temp</h3>
              <strong
                style={{
                  color: "violet",
                  fontSize: 32,
                  fontFamily: "sans-serif",
                }}
              >
                {currentScenario?.initialVitals?.temp} C
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <h2>ECG</h2>
        <div className={styles.monitor}>
          <p style={{ marginRight: 16 }}>II</p>

          <ECGMonitor
            ecgParameters={ecgParameters}
            pulseRate={80}
            svgWidth={1800}
            svgHeight={200}
          />
          <h2 className={styles.ecgRate}>
            80 <span style={{ color: "limegreen" }}>&hearts;</span>
          </h2>
        </div>
      </div>
    </div>
  ); //
}
{
  /* */
}
