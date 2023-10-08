import React from "react";
import "../App.css";
import JoinForm from "../components/JoinForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Conference from "../components/Conference";
import { useEffect } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";

export default function Screen() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <div className="App">
      <Header />
      {isConnected ? (
        <>
          <Conference />
          {/* <Footer /> */}
        </>
      ) : (
        <JoinForm />
      )}
    </div>
  );
}
