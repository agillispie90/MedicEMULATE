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

  useEffect(() => {
    let d = "M 0,0 ";
    const { pWave, prInterval, qrsComplex, stSegment, tWave } = ecgParameters;
    let currentX = 0;
    const scaleFactorX = svgWidth / 150;
    const scaleFactorY = svgHeight / 40;

    const drawBeat = () => {
      let segment = "";

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

      segment += `l ${((stSegment.duration / 0.1) * scaleFactorX) / 2},${
        (-stSegment.height / 0.1) * scaleFactorY
      } h ${(stSegment.duration / 0.2) * scaleFactorX} `;
      currentX += (stSegment.duration / 0.04) * scaleFactorX;

      // ST segment (new)
      segment += `l ${((stSegment.duration / 0.1) * scaleFactorX) / 2},${
        (-stSegment.height / 0.1) * scaleFactorY
      } h ${(stSegment.duration / 0.2) * scaleFactorX} `;
      currentX += (stSegment.duration / 0.04) * scaleFactorX;

      // T wave (new)
      segment += `q ${((tWave.duration / 0.04) * scaleFactorX) / 2},${
        (-tWave.amplitude / 0.1) * scaleFactorY
      } ${(tWave.duration / 0.04) * scaleFactorX},${
        (stSegment.height / 0.1) * scaleFactorY
      } `;
      currentX += (tWave.duration / 0.04) * scaleFactorX;

      // Bring the line back to baseline
      segment += `l 0,${(stSegment.height / 0.1) * scaleFactorY} `;

      // Complete the RR interval
      let rrIntervalMM = 1500 / Math.max(pulseRate, 1);
      let remainingWidth = rrIntervalMM * scaleFactorX - currentX;
      segment += `h ${remainingWidth}`;
      currentX = 0; // Reset for the next beat

      return segment;
    };
    for (let i = 0; i < Math.floor((pulseRate * 6) / 60); i++) {
      d += drawBeat();
      currentX = 0; // Reset for next beat
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
    <svg width={svgWidth} height={svgHeight}>
      <path
        ref={pathRef}
        stroke="black"
        strokeWidth="1"
        fill="none"
        transform={`translate(0, ${svgHeight / 2})`}
      />
      <circle
        ref={circleRef}
        r="4"
        fill="green"
        transform={`translate(0, ${svgHeight / 2})`}
      />
    </svg>
  );
}
