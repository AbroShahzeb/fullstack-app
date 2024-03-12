import io from "socket.io-client";
import { useState, useEffect } from "react";

let socket;

function App() {
  const [message, setMessage] = useState("");
  const [nextQuestion, setNextQuestion] = useState({});

  useEffect(() => {
    socket = io("http://localhost:8000");

    socket.on("connection", () =>
      console.log("Connected to the socket server")
    );

    socket.on("next-question", (data) => setNextQuestion(data));

    return () => socket.disconnect();
  }, []);

  async function handleClick() {
    const res = await fetch(
      "http://localhost:8000/api/v1/teachers/my-quizzes",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWQ5ZTUxZWExNjc2MTc1ZDUwMDFhNSIsImlhdCI6MTcxMDIwNjIwOSwiZXhwIjoxNzE3OTgyMjA5fQ.XxzdsKeUPH9PwCLNcW66uvd57za9OVKrKhM31LjH1OU",
        },
      }
    );

    const data = await res.json();
    console.log(data);
  }

  async function handleNextQuestion() {
    const res = await fetch(
      "http://localhost:8000/api/v1/quizzes/65efa2e1bd131f887ba00141/next-question",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          queIndex: 0,
        }),
      }
    );

    const data = await res.json();

    socket.on("next-question", (data) => setNextQuestion(data));
    console.log(data);
  }
  return (
    <div>
      <p>Press the button below to get all quizzes</p>
      <button
        onClick={handleClick}
        className="px-3 py-2 rounded-md text-lg font-semibold bg-blue-700 text-white"
      >
        Get Quizzes
      </button>
      <button onClick={handleNextQuestion}>Get next question</button>

      <h2>Question</h2>
      <p>{nextQuestion?.question}</p>
      <ol>
        {nextQuestion?.options?.map((option) => (
          <li>{option}</li>
        ))}
      </ol>

      <p>Correct option: {nextQuestion?.correctOption}</p>
    </div>
  );
}

export default App;
