import logo from "./logo.svg";
import "./App.css";
import Money from "../src/Components/Money";
import Players from "../src/Components/Players";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import { useEffect, useState, useRef } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [players, setPlayers] = useState();
  const [bucketRect, setBucketRect] = useState(null);

  const addScore = (value, id) => {
    setPlayers(
      players.map((player) =>
        player.id === id ? { ...player, score: player.score + value } : player
      )
    );
  };
  const divRef = useRef();

  let color = [
    "bg-red-500",
    "bg-green-500",
    "bg-green-700",
    "bg-purple-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-indigo-700",
    "bg-pink-500",
  ];
  useEffect(() => {
    setBucketRect(divRef.current.getBoundingClientRect());
    setPlayers([
      { id: 1, name: "Salman1", color: color[0], score: 0 },
      { id: 2, name: "Salman2", color: color[1], score: 0 },
      { id: 3, name: "Salman3", color: color[2], score: 0 },
      { id: 4, name: "Salman4", color: color[3], score: 0 },
      { id: 5, name: "Salman5", color: color[4], score: 0 },
      { id: 6, name: "Salman6", color: color[5], score: 0 },
      { id: 7, name: "Salman7", color: color[6], score: 0 },
      { id: 8, name: "Salman8", color: color[7], score: 0 },
    ]);
  }, []);

  //--------------Uncomment this for money and player screen to show up------------------

  // return (
  //   <div className="flex w-full overflow-hidden">
  //     <div className="w-1/2 min-h-screen ">
  //       <Money
  //         addMoney={(value) => addScore(value, 1)}
  //         bucketRect={bucketRect}
  //       />
  //       <div style={{ position: "fixed", bottom: 0, right: "50vw" }}>
  //         <div
  //           className="bg-green-500 w-24 h-12 border border-b-4 border-r-4 border-l-4 border-blue-700 border-t-0 z-50"
  //           ref={divRef}
  //         ></div>
  //       </div>
  //     </div>
  //     <div className="w-1/2 flex flex-wrap m-8">
  //       {players && players.map((player) => <Players player={player} />)}
  //     </div>
  //     {/* <div className="pr-4 pt-8"> */}
  //       {/* <p>Legend</p> */}
  //       {/* {players && players.map((player) => <Legend player={player} />)} */}
  //       {/* {players && <Ranks players={players} />} */}
  //     {/* </div> */}
  //   </div>
  // );

  //Only player screen
  return (
    <div className="flex w-screen overflow-hidden">
      <div className="min-w-screen min-h-screen flex flex-wrap m-8 items-center justify-center">
        {players && players.map((player) => <Players player={player} />)}
      </div>
      {/* <div className="pr-4 pt-8"> */}
      {/* <p>Legend</p> */}
      {/* {players && players.map((player) => <Legend player={player} />)} */}
      {/* {players && <Ranks players={players} />} */}
      {/* </div> */}
      <div style={{ position: "fixed", bottom: 0, right: "50vw" }}>
        <div
          className="bg-green-500 w-24 h-12 border border-b-4 border-r-4 border-l-4 border-blue-700 border-t-0 z-50"
          ref={divRef}
        ></div>
      </div>
    </div>
  );
}

export default App;
