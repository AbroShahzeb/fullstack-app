import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "./userApiSlice";
import { useState } from "react";

function App() {
  const [register, { isLoading, error }] = useRegisterMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(name, email, password, passwordConfirm);

    try {
      const res = await register({
        name,
        email,
        password,
        passwordConfirm,
      }).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err.data.message);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="password confirmation"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button>Register</button>
      </form>
    </main>
  );
}

export default App;
