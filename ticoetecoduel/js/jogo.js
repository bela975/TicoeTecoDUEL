const params = new URLSearchParams(window.location.search);
const nome1 = params.get("j1") || "Jogador 1";
const nome2 = params.get("j2") || "Jogador 2";

const jogador1 = new Jogador(nome1, new Tamagotchi("tico"));
const jogador2 = new Jogador(nome2, new Tamagotchi("teco"));
const jogo = new Jogo(jogador1, jogador2);

const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const timerEl = document.getElementById("timer");

const hungerBar1 = document.getElementById("hungerBar1");
const cleanBar1 = document.getElementById("cleanBar1");
const happyBar1 = document.getElementById("happyBar1");
const energyBar1 = document.getElementById("energyBar1");

const hungerBar2 = document.getElementById("hungerBar2");
const cleanBar2 = document.getElementById("cleanBar2");
const happyBar2 = document.getElementById("happyBar2");
const energyBar2 = document.getElementById("energyBar2");

const petImage1 = document.getElementById("petImage1");
const petImage2 = document.getElementById("petImage2");

const needs1 = document.getElementById("needs1");
const needs2 = document.getElementById("needs2");

const panel1 = document.getElementById("panel1");
const panel2 = document.getElementById("panel2");

const effect1 = document.getElementById("effect1");
const effect2 = document.getElementById("effect2");

const logBody = document.getElementById("logBody");
const resultModal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restartBtn");

name1.textContent = nome1;
name2.textContent = nome2;

function atualizarBarra(elemento, valor) {
  elemento.style.width = `${valor}%`;
}

function preencherLista(listaEl, items) {
  listaEl.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listaEl.appendChild(li);
  });
}

function atualizarPainelCritico(panel, pet) {
  const media = pet.getAverage();

  if (media <= 35) {
    panel.classList.add("critical-panel");
  } else {
    panel.classList.remove("critical-panel");
  }
}

function atualizarTurnoVisual() {
  panel1.classList.remove("active-turn");
  panel2.classList.remove("active-turn");

  if (jogo.turno === 0) {
    panel1.classList.add("active-turn");
  } else {
    panel2.classList.add("active-turn");
  }
}

function tocarAnimacaoPet(imgEl) {
  imgEl.classList.remove("pet-bounce");
  void imgEl.offsetWidth;
  imgEl.classList.add("pet-bounce");
}

function criarEfeito(effectLayer, tipo) {
  const icone = document.createElement("img");
  icone.className = "effect-icon";

  if (tipo === "feed") icone.src = "img/food-removebg-preview.png";
  if (tipo === "bath") icone.src = "img/bath-removebg-preview.png";
  if (tipo === "play") icone.src = "img/heart-removebg-preview.png";
  if (tipo === "sleep") icone.src = "img/zzz-removebg-preview.png";

  icone.style.left = `${Math.floor(Math.random() * 70) + 15}%`;
  icone.style.top = `${Math.floor(Math.random() * 25) + 50}%`;

  effectLayer.appendChild(icone);

  setTimeout(() => {
    icone.remove();
  }, 1000);
}

function traduzirAcao(acao) {
  if (acao === "feed") return "Alimentar";
  if (acao === "bath") return "Dar banho";
  if (acao === "play") return "Brincar";
  if (acao === "sleep") return "Descansar";
  return acao;
}

function registrarLog(nomeJogador, acao, pontos) {
  const tr = document.createElement("tr");

  const tdJogador = document.createElement("td");
  tdJogador.textContent = nomeJogador;

  const tdAcao = document.createElement("td");
  tdAcao.textContent = traduzirAcao(acao);

  const tdTempo = document.createElement("td");
  tdTempo.textContent = `${jogo.tempo}s`;

  const tdPontos = document.createElement("td");
  tdPontos.textContent = `${pontos >= 0 ? "+" : ""}${pontos}`;

  tr.appendChild(tdJogador);
  tr.appendChild(tdAcao);
  tr.appendChild(tdTempo);
  tr.appendChild(tdPontos);

  logBody.prepend(tr);

  if (logBody.children.length > 10) {
    logBody.removeChild(logBody.lastChild);
  }
}

function atualizarTela() {
  score1.textContent = jogador1.pontos;
  score2.textContent = jogador2.pontos;
  timerEl.textContent = jogo.tempo;

  atualizarBarra(hungerBar1, jogador1.pet.hunger);
  atualizarBarra(cleanBar1, jogador1.pet.cleanliness);
  atualizarBarra(happyBar1, jogador1.pet.happiness);
  atualizarBarra(energyBar1, jogador1.pet.energy);

  atualizarBarra(hungerBar2, jogador2.pet.hunger);
  atualizarBarra(cleanBar2, jogador2.pet.cleanliness);
  atualizarBarra(happyBar2, jogador2.pet.happiness);
  atualizarBarra(energyBar2, jogador2.pet.energy);

  petImage1.src = jogador1.pet.getSpritePath();
  petImage2.src = jogador2.pet.getSpritePath();

  preencherLista(needs1, jogador1.pet.getNeeds());
  preencherLista(needs2, jogador2.pet.getNeeds());

  atualizarPainelCritico(panel1, jogador1.pet);
  atualizarPainelCritico(panel2, jogador2.pet);

  atualizarTurnoVisual();
}

function finalizarJogo() {
  resultModal.classList.remove("hidden");

  const vencedor = jogo.getVencedor();

  if (vencedor === null) {
    resultText.textContent = `Empate! ${jogador1.nome} e ${jogador2.nome} terminaram com desempenho equivalente.`;
    return;
  }

  resultText.textContent = `${vencedor.nome} venceu! Pontuação final: ${vencedor.pontos} pontos.`;
}

function executarAcao(indiceJogador, action) {
  if (jogo.finalizado) return;

  if (indiceJogador !== jogo.turno) {
    return;
  }

  const jogador = jogo.jogadores[indiceJogador];
  const pontos = jogo.avaliarAcao(jogador, action);

  registrarLog(jogador.nome, action, pontos);

  if (indiceJogador === 0) {
    tocarAnimacaoPet(petImage1);
    criarEfeito(effect1, action);
  } else {
    tocarAnimacaoPet(petImage2);
    criarEfeito(effect2, action);
  }

  jogo.trocarTurno();
  atualizarTela();
}

document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const numeroJogador = Number(btn.dataset.player);
    const action = btn.dataset.action;
    const indiceJogador = numeroJogador - 1;

    executarAcao(indiceJogador, action);
  });
});

document.addEventListener("keydown", (event) => {
  if (jogo.finalizado) return;

  const tecla = event.key.toLowerCase();

  // TICO - WASD
  if (tecla === "w") {
    event.preventDefault();
    executarAcao(0, "feed");
    return;
  }

  if (tecla === "a") {
    event.preventDefault();
    executarAcao(0, "bath");
    return;
  }

  if (tecla === "s") {
    event.preventDefault();
    executarAcao(0, "play");
    return;
  }

  if (tecla === "d") {
    event.preventDefault();
    executarAcao(0, "sleep");
    return;
  }

  // TECO - SETAS
  if (event.key === "ArrowUp") {
    event.preventDefault();
    executarAcao(1, "feed");
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    executarAcao(1, "bath");
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    executarAcao(1, "play");
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    executarAcao(1, "sleep");
    return;
  }
});

restartBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

atualizarTela();

const loopJogo = setInterval(() => {
  if (jogo.finalizado) {
    clearInterval(loopJogo);
    finalizarJogo();
    return;
  }

  jogo.decairPets();
  jogo.diminuirTempo();
  atualizarTela();
}, 1000);