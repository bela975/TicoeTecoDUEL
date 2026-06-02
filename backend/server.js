const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Jogo } = require("./gameLogic");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"]
  }
});

const rooms = new Map();

function gerarCodigoSala() {
  let code;
  do {
    code = Math.random().toString(36).substring(2, 7).toUpperCase();
  } while (rooms.has(code));
  return code;
}

function emitState(roomCode) {
  const jogo = rooms.get(roomCode);
  if (jogo) io.to(roomCode).emit("gameState", jogo.getState());
}

function startRoomLoop(roomCode) {
  const jogo = rooms.get(roomCode);
  if (!jogo || jogo.interval) return;

  jogo.interval = setInterval(() => {
    const currentGame = rooms.get(roomCode);
    if (!currentGame) return clearInterval(jogo.interval);
    currentGame.tick();
    emitState(roomCode);
    if (currentGame.finalizado) clearInterval(currentGame.interval);
  }, 1000);
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend Tico e Teco Duel online" });
});

app.get("/rooms/:roomCode", (req, res) => {
  const jogo = rooms.get(req.params.roomCode.toUpperCase());
  if (!jogo) return res.status(404).json({ status: "erro", message: "Sala não encontrada." });
  return res.json({ status: "sucesso", data: jogo.getState() });
});

io.on("connection", (socket) => {
  socket.on("createRoom", ({ nome }, callback) => {
    try {
      const roomCode = gerarCodigoSala();
      const jogo = new Jogo(roomCode);
      const playerIndex = jogo.addPlayer(nome, socket.id);
      rooms.set(roomCode, jogo);
      socket.join(roomCode);
      socket.data.roomCode = roomCode;
      socket.data.playerIndex = playerIndex;
      callback?.({
        ok: true,
        roomCode,
        playerIndex,
        state: jogo.getState()
      });
      emitState(roomCode);
    } catch (error) {
      callback?.({ ok: false, message: error.message });
    }
  });

  socket.on("joinRoom", ({ nome, roomCode }, callback) => {
    try {
      const code = String(roomCode || "").trim().toUpperCase();
      const jogo = rooms.get(code);
      if (!jogo) throw new Error("Sala não encontrada.");
      const playerIndex = jogo.addPlayer(nome, socket.id);
      socket.join(code);
      socket.data.roomCode = code;
      socket.data.playerIndex = playerIndex;
      callback?.({
        ok: true,
        roomCode: code,
        playerIndex,
        state: jogo.getState()
      });
      emitState(code);
      if (jogo.started) startRoomLoop(code);
    } catch (error) {
      callback?.({ ok: false, message: error.message });
    }
  });

  socket.on("playerAction", ({ action }, callback) => {
    try {
      const roomCode = socket.data.roomCode;
      const jogo = rooms.get(roomCode);
      if (!jogo) throw new Error("Sala inválida.");
      const log = jogo.executarAcao(socket.id, action);
      callback?.({ ok: true, log });
      io.to(roomCode).emit("actionEffect", { playerIndex: log.playerIndex, action });
      emitState(roomCode);
    } catch (error) {
      callback?.({ ok: false, message: error.message });
    }
  });

  socket.on("restartRoom", (callback) => {
    const roomCode = socket.data.roomCode;
    const oldGame = rooms.get(roomCode);
    if (!oldGame) return callback?.({ ok: false, message: "Sala inválida." });
    const nomes = oldGame.jogadores.map((j) => ({ nome: j.nome, socketId: j.socketId }));
    clearInterval(oldGame.interval);
    const novoJogo = new Jogo(roomCode);
    nomes.forEach((j) => novoJogo.addPlayer(j.nome, j.socketId));
    rooms.set(roomCode, novoJogo);
    callback?.({ ok: true });
    emitState(roomCode);
    startRoomLoop(roomCode);
  });

  socket.on("disconnect", () => {
    const roomCode = socket.data.roomCode;
    const jogo = rooms.get(roomCode);
    if (!jogo) return;
    jogo.removePlayer(socket.id);
    io.to(roomCode).emit("playerDisconnected", { message: "Um jogador desconectou." });
    emitState(roomCode);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
