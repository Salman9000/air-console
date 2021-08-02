import { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import useWindowDimensions from "../customHooks/useWindowDimensions";
import useInterval from "../customHooks/useInterval";

export default function Money({ addMoney, bucketRect }) {
  let { height, width } = useWindowDimensions();
  let ID = 1;
  const rotateAngle = [0, 1, 2, 3, 6, 12, 45];

  const randomScore = () => {
    let scoreArray = [50, 100, 150, 300, 500];
    let score = scoreArray[Math.floor(Math.random() * 5)];
    return score;
  };
  const moneyRef = useRef({});
  const [money, setMoney] = useState([]);

  const tick = () => {
    var newMoney = [];

    money.forEach((item) => {
      // only keep recent items or the one in hand
      if (
        item.spawnTime + item.duration * 1000 > Date.now() ||
        item.isDragging
      ) {
        newMoney.push(item);
      }
    });
    if (money.length < 10) {
      newMoney.push({
        id: Date.now(),
        value: randomScore(),
        isDragging: false,
        left: width * Math.random(),
        rot: rotateAngle[Math.floor(Math.random() * rotateAngle.length)],
        negative: Math.random(),
        duration: Math.floor(Math.random() * (16 - 6) + 6),
        spawnTime: Date.now(),
      });
    }
    setMoney(newMoney);
  };

  useInterval(tick, 500);

  const touchMoney = (item, index, touching) => {
    item.isDragging = touching;
    // console.log(item);
    const moneyCopy = [...money];
    moneyCopy[index] = item;
    setMoney([...moneyCopy]);
  };

  return (
    <div className={``}>
      {money.map((item, i) => (
        <div key={item.id} className={item.id}>
          <Draggable
            onStart={() => {
              touchMoney(item, i, true);
            }}
            onStop={() => {
              touchMoney(item, i, false);
            }}
            onDrag={(e) => {
              // check if within bucket
              const x = e.clientX || e.touches[0].clientX;
              const y = e.clientY || e.touches[0].clientY;
              // console.log(e)
              if (
                x > bucketRect.left &&
                x < bucketRect.right &&
                y > bucketRect.top &&
                y < bucketRect.bottom
              ) {
                // kill this item
                const moneyCopy = [...money];
                moneyCopy.splice(i, 1);
                setMoney([...moneyCopy]);
                addMoney(item.value);
              }
              // !item.selected && catchMoney(item, e, moneyRef, i);
            }}
          >
            <div ref={(element) => (moneyRef.current[i] = element)}>
              <div
                style={{
                  // top: `-100px`,
                  left: item.left,
                  animation: `topToBottom ${item.duration}s linear`,
                  animationPlayState: item.isDragging ? "paused" : "running",
                  // transform: (item.spawnTime + 1000 < Date.now()) ? `translateY(${height + 300}px)`: 'translateY(0px)', //0  1200px
                }}
                className="absolute"
              >
                <div
                  className={` transform  h-8 ${
                    item.negative > 0.5 ? "-" : ""
                  }rotate-${
                    item.rot
                  } bg-yellow-300 hover:bg-yellow-600 hover:cursor-move  rounded-lg text-white flex items-center px-8 mx-5 z-50 select-none`}
                >
                  {item.value}
                </div>
              </div>
            </div>
          </Draggable>
        </div>
      ))}
    </div>
  );
}
