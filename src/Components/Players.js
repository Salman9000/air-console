import { useEffect, useState } from "react";
import useWindowDimensions from "../customHooks/useWindowDimensions";
export default function Players({ player }) {
  const { color, name, score } = player;
  console.log(color);
  const size = 8 + score / 80;
  return (
    <div className="mx-4 mb-2">
      <div
        className={`rounded-full flex items-center justify-center text-white font-bold text-lg ${color}`}
        style={{
          // position: "relative",
          // left: posX,
          // top: posY,
          height: `${size}vw`,
          width: `${size}vw`,
        }}
      >
        <div className="text-center">{score}</div>
      </div>
      <p className="text-xs text-center mt-2 font-bold">{name}</p>
    </div>
  );
}
