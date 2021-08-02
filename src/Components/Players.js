import { useEffect, useState } from "react";
import useWindowDimensions from "../customHooks/useWindowDimensions";
export default function Players({ score }) {
  const size = 100 + (score/10);
  const posX = 50;
  const posY = 200;
  return (
    <div className="flex w-full min-h-screen">
      <div
        className="rounded-full flex items-center justify-center text-white font-bold text-lg bg-purple-500"
        style={{
          position: "relative",
          left: posX,
          top: posY,
          height: `${size}px`,
          width: `${size}px`,
        }}
      >
        {score}
      </div>
    </div>
  );
}
