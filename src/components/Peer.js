import {
  useVideo,
  useAVToggle,
  useRemoteAVToggle,
  useHMSActions,
  selectLocalPeer,
  useHMSStore,
} from "@100mslive/react-sdk";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

function Peer({ peer }) {
  const hmsActions = useHMSActions();

  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const localPeer = useHMSStore(selectLocalPeer);
  const {
    isAudioEnabled,
    isVideoEnabled,
    toggleAudio: remoteToggleAudio, // Destructuring
    toggleVideo: remoteToggleVideo, // Destructuring
  } = useRemoteAVToggle(peer.audioTrack, peer.videoTrack);

  console.log("isAudioEnabled", isAudioEnabled);

  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  console.log(peer);

  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />

      {/* ------------------------------- For Local peers ----------------------------------*/}

      <div className="peer-name">
        <b>{peer.roleName}</b> <br />
        {peer.name} {peer.isLocal ? "(You)" : ""} <br />
        {(peer.isLocal || peer.roleName === "guest") && (
          <div>
            {peer.isLocal &&
              (peer.roleName === "host" || peer.roleName === "guest") && (
                <>
                  <button onClick={toggleAudio}>
                    {isLocalAudioEnabled ? (
                      <FaMicrophone />
                    ) : (
                      <FaMicrophoneSlash />
                    )}
                  </button>
                  <button onClick={toggleVideo}>
                    {isLocalVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                  </button>
                </>
              )}
          </div>
        )}
        {/* --------------------------------- For Remote peers ----------------------------------*/}
        {localPeer.roleName == "host" && !peer.isLocal ? (
          <div>
            <button
              style={{ backgroundColor: "red" }}
              onClick={remoteToggleAudio}
            >
              {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>
            <button
              style={{ backgroundColor: "red" }}
              onClick={remoteToggleVideo}
            >
              {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Peer;
