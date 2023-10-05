import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    token: "",
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
    console.log("prevValues", e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, token } = inputValues;
    // console.log("token", token);
    try {
      await hmsActions.join({ userName: name, authToken: token });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Room</h2>
      <div className="input-container">
        <input
          required
          value={inputValues.name}
          onChange={handleInputChange}
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
        />
      </div>
      <div className="input-container">
        <input
          required
          id="auth-token"
          value={inputValues.token}
          type="text"
          name="token"
          placeholder="Auth Token"
          onChange={handleInputChange}
        />
      </div>
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinForm;
