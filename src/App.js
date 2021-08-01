import logo from "./logo.svg";
import "./App.css";
import Money from "../src/Components/Money";
import Players from "../src/Components/Players";
import { useEffect, useState, useRef } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [moneyArray, setMoneyArray] = useState([{ id: 1 }]);
  const [h, setH] = useState(100);
  const [w, setW] = useState(100);
  const [bucketPos, setBucketPos] = useState(null);

  const divRef = useRef();

  const catchMoney = (item, e, moneyRef, i) => {
    const moneyBlockDetails =
      moneyRef.current[i].childNodes[0].getBoundingClientRect();
    // const height = Math.ceil(moneyBlockDetails.height);
    // const width = Math.ceil(moneyBlockDetails.width);
    const moneyBlockX = Math.ceil(moneyBlockDetails.x);
    const moneyBlockY = Math.ceil(moneyBlockDetails.y);
    if (
      moneyBlockX < bucketPos[0] + 40 &&
      moneyBlockX > bucketPos[0] - 40 &&
      moneyBlockY < bucketPos[1] + 20 &&
      moneyBlockY > bucketPos[1] - 20
    ) {
      console.log("HERE");
      item.selected = true;
      switch (item.value) {
        case 50:
          setH(h + 10);
          setW(w + 10);
          break;
        case 100:
          setH(h + 20);
          setW(w + 20);
          break;
        case 150:
          setH(h + 30);
          setW(w + 30);
          break;
        case 300:
          setH(h + 50);
          setW(w + 50);
          break;
        default:
          break;
      }
      setScore(score + item.value);
    }
  };

  const tick = () => {
    setBucketPos([
      divRef.current.getBoundingClientRect().x,
      divRef.current.getBoundingClientRect().y,
    ]);
    // setSecond2((prevSecond) => prevSecond + 1);
    setMoneyArray([
      ...moneyArray,
      { id: moneyArray[moneyArray.length - 1].id + 1 },
    ]);
    if (moneyArray.length > 10) {
      const temp = moneyArray;
      temp.shift();
      // console.log(temp);
      setMoneyArray(temp);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => tick(), 2000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      <div className="w-1/2">
        {moneyArray.map((money) => (
          <Money catchMoney={catchMoney} key={money.id} bucketPos={bucketPos} />
        ))}
        <div className="flex items-end min-h-screen justify-center">
          <div
            className="bg-green-500 w-24 h-12 border border-b-4 border-r-4 border-l-4 border-blue-700 border-t-0 z-50"
            ref={divRef}
          ></div>
        </div>
      </div>
      <div className="w-1/2">
        <Players catchMoney={catchMoney} score={score} h={h} w={w} />
      </div>
    </div>
  );
}

export default App;
