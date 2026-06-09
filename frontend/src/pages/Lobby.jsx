import React, { useState } from "react";
import { socket } from "../services/socket.js";

export default function Lobby({ onEnterGame }) {
  const [nome, setNome] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

 function conectar(callback) {
  setErro("");

  if (!nome.trim()) {
    setErro("Digite seu nome antes de entrar no jogo.");
    return;
  }

  setLoading(true);

  if (!socket.connected) {
    socket.connect();
  }

  setTimeout(() => {
    if (!socket.connected) {
      setLoading(false);
      setErro("Não foi possível conectar ao backend. Verifique se o servidor está rodando na porta 3001.");
      return;
    }

    callback();
  }, 800);
}
  function criarSala() {
    conectar(() => {
      socket.emit("createRoom", { nome }, (resposta) => {
        setLoading(false);

        if (!resposta?.ok) {
          setErro(resposta?.message || "Erro ao criar sala.");
          return;
        }

        onEnterGame({
          roomCode: resposta.roomCode,
          playerIndex: resposta.playerIndex,
          nome,
          initialState: resposta.state
        });
      });
    });
  }

  function entrarSala(event) {
    event.preventDefault();

    if (!roomCode.trim()) {
      setErro("Digite o código da sala.");
      return;
    }

    conectar(() => {
      socket.emit("joinRoom", { nome, roomCode }, (resposta) => {
        setLoading(false);

        if (!resposta?.ok) {
          setErro(resposta?.message || "Erro ao entrar na sala.");
          return;
        }

        onEnterGame({
          roomCode: resposta.roomCode,
          playerIndex: resposta.playerIndex,
          nome,
          initialState: resposta.state
        });
      });
    });
  }

  return (
    <main className="start-screen">
      <section className="start-card">
        <h1>Tico e Teco: Duel</h1>

        <p className="subtitle">
          Agora em React, com backend e multiplayer em computadores diferentes.
        </p>

        <form className="start-form" onSubmit={entrarSala}>
          <div className="field">
            <label htmlFor="nome">Seu nome</label>
            <input
              id="nome"
              value={nome}
              maxLength={20}
              placeholder="Ex.: Ana"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="start-btn"
            onClick={criarSala}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Criar sala"}
          </button>

          <div className="field">
            <label htmlFor="roomCode">Código da sala</label>
            <input
              id="roomCode"
              value={roomCode}
              maxLength={5}
              placeholder="Ex.: ABC12"
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            />
          </div>

          <button type="submit" className="secondary-btn" disabled={loading}>
            {loading ? "Carregando..." : "Entrar em sala existente"}
          </button>
        </form>

        {erro && <p className="error-message">{erro}</p>}

        <div className="rules-box">
          <h2>Como jogar</h2>
          <p>
            Um jogador cria a sala e envia o código para o outro. Cada jogador
            joga no próprio computador. O backend controla turno, regras, tempo
            e pontuação.
          </p>
        </div>
      </section>
    </main>
  );
}