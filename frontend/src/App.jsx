import React, { useState } from "react";
import Lobby from "./pages/Lobby.jsx";
import Game from "./pages/Game.jsx";

export default function App() {
  const [session, setSession] = useState(null);

  if (!session) {
    return <Lobby onEnterGame={setSession} />;
  }

  return <Game session={session} onExit={() => setSession(null)} />;
}