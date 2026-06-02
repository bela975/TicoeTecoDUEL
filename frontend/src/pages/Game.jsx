import React, { useEffect, useState } from "react";
import { socket } from "../services/socket.js";
import PlayerPanel from "../components/PlayerPanel.jsx";
import ActionLog from "../components/ActionLog.jsx";

export default function Game({ session, onExit }) {
  const [gameState, setGameState] = useState(session.initialState || null);
  const [erro, setErro] = useState("");
  const [effects, setEffects] = useState({});
  const [disconnectMessage, setDisconnectMessage] = useState("");
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    function handleGameState(state) {
      setGameState(state);
    }

    function handleActionEffect({ playerIndex, action }) {
      setEffects((prev) => ({ ...prev, [playerIndex]: action }));

      setTimeout(() => {
        setEffects((prev) => ({ ...prev, [playerIndex]: null }));
      }, 900);
    }

    function handleDisconnected(payload) {
      setDisconnectMessage(payload?.message || "Um jogador desconectou.");
    }

    socket.on("gameState", handleGameState);
    socket.on("actionEffect", handleActionEffect);
    socket.on("playerDisconnected", handleDisconnected);

    return () => {
      socket.off("gameState", handleGameState);
      socket.off("actionEffect", handleActionEffect);
      socket.off("playerDisconnected", handleDisconnected);
    };
  }, []);

  function executarAcao(action) {
    setErro("");

    socket.emit("playerAction", { action }, (resposta) => {
      if (!resposta?.ok) {
        setErro(resposta?.message || "Erro ao executar ação.");
      }
    });
  }

  function reiniciar() {
    setErro("");

    socket.emit("restartRoom", (resposta) => {
      if (!resposta?.ok) {
        setErro(resposta?.message || "Erro ao reiniciar partida.");
      }
    });
  }

  async function copiarCodigoSala() {
    try {
      await navigator.clipboard.writeText(gameState.roomCode);
      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 1500);
    } catch {
      setErro(
        "Não consegui copiar automaticamente. Selecione o código da sala e envie para o outro jogador."
      );
    }
  }

  if (!gameState) {
    return (
      <main className="loading-screen">
        <h1>Carregando partida...</h1>
      </main>
    );
  }

  const jogadores = gameState.jogadores || [];
  const myTurn = gameState.turno === session.playerIndex;
  const canPlay = gameState.started && !gameState.finalizado && myTurn;

  return (
    <>
      <header className="topbar">
        <div className="title-box">
          <h1>Tico e Teco: Duel</h1>

          <p>
            Sala:{" "}
            <strong className="room-code">{gameState.roomCode}</strong> — você
            é o Jogador {session.playerIndex + 1}
          </p>

          <button className="copy-btn" onClick={copiarCodigoSala}>
            {copiado ? "Código copiado!" : "Copiar código da sala"}
          </button>
        </div>

        <div className="timer-box">
          <span>Tempo</span>
          <strong>{gameState.tempo}</strong>
        </div>
      </header>

      <section className="turn-message">
        {!gameState.started && <p>Aguardando o segundo jogador entrar na sala.</p>}

        {gameState.started && !gameState.finalizado && (
          <p>
            {myTurn
              ? "Sua vez! Escolha uma ação."
              : "Aguarde a vez do outro jogador."}
          </p>
        )}

        {erro && <p className="error-message">{erro}</p>}

        {disconnectMessage && (
          <p className="error-message">{disconnectMessage}</p>
        )}
      </section>

      <main className="game-layout">
        <PlayerPanel
          jogador={jogadores[0]}
          playerNumber={1}
          active={gameState.turno === 0}
          isMe={session.playerIndex === 0}
          canPlay={canPlay && session.playerIndex === 0}
          onAction={executarAcao}
          effect={effects[0]}
        />

        <PlayerPanel
          jogador={jogadores[1]}
          playerNumber={2}
          active={gameState.turno === 1}
          isMe={session.playerIndex === 1}
          canPlay={canPlay && session.playerIndex === 1}
          onAction={executarAcao}
          effect={effects[1]}
        />
      </main>

      <ActionLog logs={gameState.logs || []} />

      {gameState.finalizado && (
        <section className="result-modal">
          <div className="result-card">
            <h2>Fim de jogo</h2>

            {gameState.vencedor ? (
              <p>
                {gameState.vencedor.nome} venceu! Pontuação final:{" "}
                {gameState.vencedor.pontos} pontos.
              </p>
            ) : (
              <p>Empate! Os jogadores terminaram com desempenho equivalente.</p>
            )}

            <button onClick={reiniciar}>Jogar novamente</button>
            <button className="secondary-btn" onClick={onExit}>
              Voltar ao lobby
            </button>
          </div>
        </section>
      )}
    </>
  );
}