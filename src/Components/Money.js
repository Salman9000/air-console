import { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import useWindowDimensions from "../customHooks/useWindowDimensions";

export default function Money({ catchMoney, bucketPos }) {
  let { height, width } = useWindowDimensions();
  let ID = 1;
  const rotateAngle = [0, 1, 2, 3, 6, 12, 45];
  // const [gameStart, setGameStart] = useState(0);
  const [translate, setTranslate] = useState(false);
  const randomScore = () => {
    let scoreArray = [50, 100, 150, 300, 500];
    let score = scoreArray[Math.floor(Math.random() * 5)];
    return score;
  };
  const moneyRef = useRef({});
  const [money, setMoney] = useState([
    {
      id: ID,
      value: 100,
      selected: false,
      rot: rotateAngle[Math.floor(Math.random() * rotateAngle.length)],
      position: 5,
      negative: Math.random(),
      // duration: Math.floor(Math.random() * (16 - 6) + 6),
    },
  ]);

  if (money.length < 7) {
    setMoney([
      ...money,
      {
        id: ID++,
        value: randomScore(),
        selected: false,
        rot: rotateAngle[Math.floor(Math.random() * rotateAngle.length)],
        negative: Math.floor(Math.random()),
        position: 0,
        // duration: Math.floor(Math.random() * (16 - 6) + 6),
      },
    ]);
  } else {
  }

  const touchMoney = (item, index) => {
    let item2 = item;
    item.duration = 1000000;
    console.log(item);
    setMoney([...money, item2]);
    console.log(money);
  };
  const tick2 = () => {
    // console.log("Ticke2");
    // if (translate === "0px") {
    //   setTranslate(`${height + 200}px`);
    // }
  };
  const tick = () => {
    // setSecond((prevState) => prevState + 1);
    if (!translate) {
      setTranslate(true);
      setTimeout(() => {
        console.log("asd");
        setMoney(
          money.map((item) => ({
            ...item,
            position: height + 200,
            duration: Math.floor(Math.random() * (16 - 6) + 6),
          }))
        );
      }, 1000);
    }
    // setMoney(money.map((item) => ({ ...item, position: height + 200 })));
  };

  useEffect(() => {
    // console.log(moneyRef.current.childNodes[0].getBoundingClientRect());
    let interval = setInterval(() => tick(), 10);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className={`flex w-full  absolute`}>
      {money.map((item, i) => (
        <div
          onClick={() => {
            // touchMoney(item, i);
          }}
          style={{
            transition: `all ${item.duration}s linear`, //change duration
            transform: `translateY(${item.position}px)`, //0  1200px
          }}
        >
          <Draggable
            onStart={() => {
              touchMoney(item, i);
            }}
            onMouseDown={() => {
              // let temp = money;
              // money[i].duration = 10000;
              // setMoney([...money, temp]);
              // touchMoney(item, i);
              // item.selected = true;
              console.log("ASd");
            }}
            onDrag={(e) => {
              !item.selected && catchMoney(item, e, moneyRef, i);
            }}
          >
            <div ref={(element) => (moneyRef.current[i] = element)}>
              {item.selected ? (
                <div
                  // style={{ top: `${item.position}px` }}
                  onClick={() => {
                    console.log(1);
                  }}
                  className={` transform  h-8 ${
                    item.negative > 0.5 ? "-" : ""
                  }rotate-${
                    item.rot
                  } bg-white flex items-center px-8 mx-5 relative text-white -top-32 z-0 select-none`}
                >
                  {item.value}
                </div>
              ) : (
                <div
                  className={` transform  h-8 ${
                    item.negative > 0.5 ? "-" : ""
                  }rotate-${
                    item.rot
                  } bg-yellow-300 hover:bg-yellow-600 hover:cursor-move  rounded-lg text-white flex items-center px-8 mx-5 relative -top-32 z-50 select-none`}
                >
                  {item.value}
                </div>
              )}
            </div>
          </Draggable>
        </div>
      ))}
    </div>
  );
}
