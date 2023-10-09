import React, { useEffect, useRef, useState } from "react";

export default function ECGMonitor({
  ecgParameters,
  pulseRate,
  svgWidth,
  svgHeight,
}) {
  const pathRef = useRef(null);
  const circleRef = useRef(null);
  const [totalLength, setTotalLength] = useState(0);

  const getRandomFactor = (range) => Math.random() * range - range / 2;

  useEffect(() => {
    let d = "M 0,0 ";
    let currentX = 0;
    const scaleFactorX = svgWidth / 150;
    const scaleFactorY = svgHeight / 40;

    const drawBeat = () => {
      let segment = "";
      let { pWave, prInterval, qrsComplex, stSegment, tWave } = ecgParameters;

      // P wave
      segment += `q ${((pWave.duration / 0.04) * scaleFactorX) / 2},${
        (-pWave.amplitude / 0.1) * scaleFactorY
      } ${(pWave.duration / 0.04) * scaleFactorX},0 `;
      currentX += (pWave.duration / 0.04) * scaleFactorX;

      // PR interval
      segment += `h ${(prInterval.duration / 0.04) * scaleFactorX} `;
      currentX += (prInterval.duration / 0.04) * scaleFactorX;

      // QRS complex
      segment += `l ${((qrsComplex.duration / 0.04) * scaleFactorX) / 2},${
        (-qrsComplex.amplitude / 0.1) * scaleFactorY
      } l ${((qrsComplex.duration / 0.04) * scaleFactorX) / 2},${
        (qrsComplex.amplitude / 0.1) * scaleFactorY
      } `;
      currentX += (qrsComplex.duration / 0.04) * scaleFactorX;

      // Simulate J-point with a small curve
      let jPointCurve = 5; // Adjust as needed for the curve tightness
      let stSegmentHeight = (stSegment.height / 0.1) * scaleFactorY;
      segment += `q ${jPointCurve},${stSegmentHeight / 2} ${
        jPointCurve * 2
      },${stSegmentHeight} `;

      // ST segment (STEMI emulation with elevation)
      let stSegmentWidth = (stSegment.duration / 0.04) * scaleFactorX;
      segment += `h ${stSegmentWidth - jPointCurve * 2} `;
      currentX += stSegmentWidth;

      // T wave starts from the elevated position and then returns to baseline
      segment += `q ${((tWave.duration / 0.04) * scaleFactorX) / 2},${
        (-tWave.amplitude / 0.1) * scaleFactorY
      } ${(tWave.duration / 0.04) * scaleFactorX},0 `;
      currentX += (tWave.duration / 0.04) * scaleFactorX;

      let artifact = Math.random();
      if (artifact < 0.5) {
        artifact *= -1;
      }
      // Return to baseline
      segment += `l 0,${-stSegmentHeight} `;

      // Complete the RR interval
      let rrIntervalMM = 1500 / Math.max(pulseRate, 1);
      let remainingWidth = rrIntervalMM * scaleFactorX - currentX;
      segment += `h ${remainingWidth}`;
      currentX = 0; // Reset for the next beat

      return segment;
    };

    for (let i = 0; i < Math.floor((pulseRate * 6) / 60); i++) {
      d += drawBeat();
    }

    if (pathRef.current) {
      pathRef.current.setAttribute("d", d);
      const length = pathRef.current.getTotalLength();
      setTotalLength(length);
    }
  }, [pulseRate, ecgParameters, svgWidth, svgHeight]);

  useEffect(() => {
    const frameRate = 25; // 25 frames per second
    const distancePerFrame = totalLength / (6 * frameRate);
    let offset = 0;

    const intervalId = setInterval(() => {
      offset = (offset + distancePerFrame) % totalLength;

      if (circleRef.current) {
        const point = pathRef.current.getPointAtLength(offset);
        circleRef.current.setAttribute("cx", point.x);
        circleRef.current.setAttribute("cy", point.y);
      }
    }, 1000 / frameRate);

    return () => {
      clearInterval(intervalId);
    };
  }, [pulseRate, totalLength]);

  return (
    <svg
      style={{
        display: "flex",
        placeItems: "center",
        paddingLeft: "3rem",
        overflow: "hidden",
        maxWidth: "100%",
      }}
      width={svgWidth}
      height={svgHeight}
    >
      <path
        ref={pathRef}
        stroke="limegreen"
        strokeWidth="2"
        fill="none"
        transform={`translate(0, ${svgHeight / 2})`}
      />
      <circle
        ref={circleRef}
        r="4"
        fill="black"
        transform={`translate(0, ${svgHeight / 2})`}
      />
    </svg>
  );
}
