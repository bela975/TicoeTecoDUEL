class Tamagotchi {
  constructor(baseName) {
    this.baseName = baseName;
    this.hunger = 100;
    this.cleanliness = 100;
    this.happiness = 100;
    this.energy = 100;
  }

  clamp() {
    this.hunger = Math.max(0, Math.min(100, this.hunger));
    this.cleanliness = Math.max(0, Math.min(100, this.cleanliness));
    this.happiness = Math.max(0, Math.min(100, this.happiness));
    this.energy = Math.max(0, Math.min(100, this.energy));
  }

  decay() {
    this.hunger -= 6;
    this.cleanliness -= 5;
    this.happiness -= 4;
    this.energy -= 3;
    this.clamp();
  }

  feed() {
    this.hunger += 28;
    this.happiness += 4;
    this.cleanliness -= 4;
    this.clamp();
  }

  bath() {
    this.cleanliness += 30;
    this.happiness -= 2;
    this.energy -= 3;
    this.clamp();
  }

  play() {
    this.happiness += 28;
    this.hunger -= 6;
    this.energy -= 8;
    this.cleanliness -= 5;
    this.clamp();
  }

  sleep() {
    this.energy += 30;
    this.hunger -= 5;
    this.happiness -= 1;
    this.clamp();
  }

  getNeeds() {
    const needs = [];
    if (this.hunger < 60) needs.push("Está com fome");
    if (this.cleanliness < 60) needs.push("Precisa de banho");
    if (this.happiness < 60) needs.push("Quer brincar");
    if (this.energy < 60) needs.push("Está com sono");
    if (needs.length === 0) needs.push("Está muito bem");
    return needs;
  }

  getAverage() {
    return Math.round((this.hunger + this.cleanliness + this.happiness + this.energy) / 4);
  }

  getVisualState() {
    const minStatus = Math.min(this.hunger, this.cleanliness, this.happiness, this.energy);
    if (minStatus <= 20) return "deadline";
    if (this.hunger < 45) return "hungry";
    if (this.cleanliness < 45) return "dirty";
    if (this.energy < 45) return "sleepy";
    if (this.happiness > 80 && this.hunger > 60 && this.cleanliness > 60) return "happy";
    return "idle";
  }

  toJSON() {
    return {
      baseName: this.baseName,
      hunger: this.hunger,
      cleanliness: this.cleanliness,
      happiness: this.happiness,
      energy: this.energy,
      needs: this.getNeeds(),
      average: this.getAverage(),
      visualState: this.getVisualState()
    };
  }
}

class Jogador {
  constructor(nome, tamagotchi, socketId = null) {
    this.nome = nome;
    this.pet = tamagotchi;
    this.pontos = 0;
    this.socketId = socketId;
  }

  addPoints(value) {
    this.pontos += value;
    if (this.pontos < 0) this.pontos = 0;
  }

  toJSON() {
    return {
      nome: this.nome,
      pontos: this.pontos,
      socketId: this.socketId,
      pet: this.pet.toJSON()
    };
  }
}

class Jogo {
  constructor(roomCode) {
    this.roomCode = roomCode;
    this.jogadores = [];
    this.tempo = 60;
    this.turno = 0;
    this.finalizado = false;
    this.started = false;
    this.logs = [];
    this.interval = null;
  }

  addPlayer(nome, socketId) {
    if (this.jogadores.length >= 2) throw new Error("Sala cheia.");
    const petName = this.jogadores.length === 0 ? "tico" : "teco";
    const jogador = new Jogador(nome || `Jogador ${this.jogadores.length + 1}`, new Tamagotchi(petName), socketId);
    this.jogadores.push(jogador);
    if (this.jogadores.length === 2) this.started = true;
    return this.jogadores.length - 1;
  }

  removePlayer(socketId) {
    const jogador = this.jogadores.find((j) => j.socketId === socketId);
    if (jogador) jogador.disconnected = true;
  }

  getPlayerIndex(socketId) {
    return this.jogadores.findIndex((j) => j.socketId === socketId);
  }

  trocarTurno() {
    this.turno = this.turno === 0 ? 1 : 0;
  }

  avaliarAcao(jogador, action) {
    const pet = jogador.pet;
    let pontos = 0;

    if (action === "feed") {
      pontos = pet.hunger < 70 ? 10 : 3;
      pet.feed();
    } else if (action === "bath") {
      pontos = pet.cleanliness < 70 ? 10 : 3;
      pet.bath();
    } else if (action === "play") {
      pontos = pet.happiness < 70 ? 10 : 3;
      pet.play();
    } else if (action === "sleep") {
      pontos = pet.energy < 70 ? 10 : 3;
      pet.sleep();
    } else {
      throw new Error("Ação inválida.");
    }

    if (pet.hunger === 0 || pet.cleanliness === 0 || pet.happiness === 0 || pet.energy === 0) pontos -= 5;
    jogador.addPoints(pontos);
    return pontos;
  }

  executarAcao(socketId, action) {
    if (!this.started) throw new Error("Aguardando segundo jogador.");
    if (this.finalizado) throw new Error("O jogo já acabou.");

    const playerIndex = this.getPlayerIndex(socketId);
    if (playerIndex === -1) throw new Error("Jogador não encontrado nesta sala.");
    if (playerIndex !== this.turno) throw new Error("Ainda não é sua vez.");

    const jogador = this.jogadores[playerIndex];
    const pontos = this.avaliarAcao(jogador, action);
    const log = {
      jogador: jogador.nome,
      action,
      tempo: this.tempo,
      pontos,
      playerIndex,
      createdAt: new Date().toISOString()
    };
    this.logs.unshift(log);
    this.logs = this.logs.slice(0, 10);
    this.trocarTurno();
    return log;
  }

  decairPets() {
    this.jogadores.forEach((jogador) => {
      const antes = jogador.pet.getAverage();
      jogador.pet.decay();
      const depois = jogador.pet.getAverage();
      if (depois < antes && depois <= 25) jogador.addPoints(-2);
    });
  }

  tick() {
    if (!this.started || this.finalizado) return;
    this.decairPets();
    if (this.tempo > 0) this.tempo--;
    if (this.tempo <= 0) this.finalizado = true;
  }

  getVencedor() {
    const [j1, j2] = this.jogadores;
    if (!j1 || !j2) return null;
    if (j1.pontos > j2.pontos) return j1;
    if (j2.pontos > j1.pontos) return j2;
    const avg1 = j1.pet.getAverage();
    const avg2 = j2.pet.getAverage();
    if (avg1 > avg2) return j1;
    if (avg2 > avg1) return j2;
    return null;
  }

  getState() {
    const vencedor = this.finalizado ? this.getVencedor() : null;
    return {
      roomCode: this.roomCode,
      tempo: this.tempo,
      turno: this.turno,
      finalizado: this.finalizado,
      started: this.started,
      jogadores: this.jogadores.map((j) => j.toJSON()),
      logs: this.logs,
      vencedor: vencedor ? { nome: vencedor.nome, pontos: vencedor.pontos } : null
    };
  }
}

module.exports = { Jogo };
