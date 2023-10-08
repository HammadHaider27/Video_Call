import { useAVToggle } from "@100mslive/react-sdk";
import "../App.css";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";


function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  return (
    <div className="control-bar">
      <button className="btn-control" onClick={toggleAudio}>
        {isLocalAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
      </button>
      <button className="btn-control" onClick={toggleVideo}>
        {isLocalVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
      </button>
    </div>
  );
}

export default Footer;
