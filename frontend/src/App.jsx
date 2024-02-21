import { io } from "socket.io-client";
import { useState, useEffect } from "react";

let socket;

const App = () => {
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.on("timerUpdate", (data) => {
      setTimer(data);
    });

    socket.on("timeEnd", (data) => {
      setMessage(data);
    });
  }, []);

  // useEffect(() => {
  //   socket.on(timerUp)
  // })
  return (
    <div>
      <h1>{+timer < 10 ? "0" + timer + ":00" : timer}</h1>
      <p>{message}</p>
    </div>
  );
};

export default App;
