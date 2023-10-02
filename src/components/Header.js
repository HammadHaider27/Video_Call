import {
	selectIsConnectedToRoom,
	useHMSActions,
	useHMSStore
} from "@100mslive/react-sdk";
import React from "react";
import "../App.css"

function Header() {
	const isConnected = useHMSStore(selectIsConnectedToRoom);
	const hmsActions = useHMSActions();

	return (
		<header>
			<img
				className="logo"
				src="https://cdn-icons-png.flaticon.com/128/5940/5940828.png"
				alt="logo"
			/>
			{isConnected && (
				<button
					id="leave-btn"
					className="btn-danger"
					onClick={() => hmsActions.leave()}
				>
					Leave Room
				</button>
			)}
		</header>
	);
}

export default Header;
  