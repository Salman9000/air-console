import logo from "./logo.svg";
import "./App.css";
import Money from "../src/Components/Money";
import Players from "../src/Components/Players";
import { useEffect, useState, useRef } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [bucketRect, setBucketRect] = useState(null);

  const divRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setBucketRect(divRef.current.getBoundingClientRect());
    }, 100);
  }, []);

  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      <div className="w-1/2">
        <Money addMoney={(value)=> setScore(score + value)} bucketRect={bucketRect} />
        <div style={{position: "fixed", bottom: 0, right: "50vw"}}>
          <div
            className="bg-green-500 w-24 h-12 border border-b-4 border-r-4 border-l-4 border-blue-700 border-t-0 z-50"
            ref={divRef}
          ></div>
        </div>
      </div>
      <div className="w-1/2">
        <Players score={score} />
      </div>
    </div>
  );
}

export default App;
