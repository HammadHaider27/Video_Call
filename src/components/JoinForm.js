import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NTFhYmQ0MzY4MTExZjZmZTRiNTc3MGQiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NTFhYmU2OGNiMzlkNTdlOGE1ZDI0MjciLCJ1c2VyX2lkIjoiMDM5ZDYxZTgtOWY0Zi00MDkzLWI2MmEtYWY0ZmNhNmIzZDk2IiwiZXhwIjoxNjk2MzM4NTA0LCJqdGkiOiI0NDBhOWM2Yi1hNjY0LTRhYmItOTNhOC1mZTFkNWQ5ZDczZWYiLCJpYXQiOjE2OTYyNTIxMDQsImlzcyI6IjY1MWFiZDQzNjgxMTFmNmZlNGI1NzcwYiIsIm5iZiI6MTY5NjI1MjEwNCwic3ViIjoiYXBpIn0.RmVXaJK9FErHAC2BObv1tYgbup6Jh-u3jwPH0s2LX-E"
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
      
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      userName = '',
      roomCode = 'kpe-jwje-brs',
    } = inputValues

    // use room code to fetch auth token
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })

    try {
      await hmsActions.join({ userName, authToken });
    } catch (e) {
      console.error(e)
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
          id="room-code"
          type="text"
          name="roomCode"
          placeholder="Room code"
          onChange={handleInputChange}
        />
      </div>
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinForm;
