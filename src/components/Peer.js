import { useVideo, useAVToggle } from "@100mslive/react-sdk";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";


function Peer({ peer }) {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
  useAVToggle();

  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  {
    console.log(peer);
  }

  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div className="peer-name">
        {peer.name} {peer.roleName} {peer.isLocal ? "(You)" : ""} <br />

        {(peer.isLocal || peer.roleName == "guest") && (
          <div>
            <>
              <button onClick={toggleAudio}>
                {isLocalAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
              </button>
              <button onClick={toggleVideo}>
                {isLocalVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
              </button>
            </>
          </div>  
        )}

        {/* {peer.roleName === "host" || !peer.isLocal && <Footer />} */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Peer;
