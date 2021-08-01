import { useEffect, useState } from "react";
import useWindowDimensions from "../customHooks/useWindowDimensions";
export default function Players({ catchMoney, score, h, w }) {
  let { height, width } = useWindowDimensions();
  // console.log({ height, width })
  // const posX = Math.floor(Math.random() * width/2-50)
  // const posY = Math.floor(Math.random() * 500)
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
          height: `${h}px`,
          width: `${w}px`,
        }}
      >
        {score}
      </div>
    </div>
  );
}
