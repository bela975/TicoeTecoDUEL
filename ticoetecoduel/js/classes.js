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

  getSpritePath() {
  const state = this.getVisualState();

  // TICO
  if (this.baseName === "tico") {
    if (state === "happy") return "img/ticoHappyteco-removebg-preview.png";
    if (state === "dirty") return "img/ticoMorto-removebg-preview.png";
    if (state === "hungry") return "img/ticoHungry-removebg-preview.png";
    if (state === "sleepy") return "img/ticoSleepy-removebg-preview.png";
    if (state === "deadline") return "img/ticoMorto-removebg-preview.png";
    return "img/ticoIdle-removebg-preview.png";
  }

  // TECO
  if (this.baseName === "teco") {
    if (state === "happy") return "img/tecoSmile-removebg-preview.png";
    if (state === "dirty") return "img/Filthyteco-removebg-preview.png";
    if (state === "hungry") return "img/teco-removebg-preview.png";
    if (state === "sleepy") return "img/sleepyteco-removebg-preview.png";
    if (state === "deadline") return "img/tecoMorto-removebg-preview.png";
    return "img/teco-removebg-preview.png";
  }
}

  getNeeds() {
    const needs = [];

    if (this.hunger < 60) needs.push("Está com fome");
    if (this.cleanliness < 60) needs.push("Precisa de banho");
    if (this.happiness < 60) needs.push("Quer brincar");
    if (this.energy < 60) needs.push("Está com sono");

    if (needs.length === 0) {
      needs.push("Está muito bem");
    }

    return needs;
  }

  getAverage() {
    return Math.round(
      (this.hunger + this.cleanliness + this.happiness + this.energy) / 4
    );
  }

  getVisualState() {
    const minStatus = Math.min(
      this.hunger,
      this.cleanliness,
      this.happiness,
      this.energy
    );

    if (minStatus <= 20) return "deadline";
    if (this.hunger < 45) return "hungry";
    if (this.cleanliness < 45) return "dirty";
    if (this.energy < 45) return "sleepy";
    if (this.happiness > 80 && this.hunger > 60 && this.cleanliness > 60) return "happy";

    return "idle";
  }

}

class Jogador {
  constructor(nome, tamagotchi) {
    this.nome = nome;
    this.pet = tamagotchi;
    this.pontos = 0;
  }

  addPoints(value) {
    this.pontos += value;
    if (this.pontos < 0) {
      this.pontos = 0;
    }
  }
}

class Jogo {
  constructor(jogador1, jogador2) {
    this.jogadores = [jogador1, jogador2];
    this.tempo = 60;
    this.turno = 0;
    this.finalizado = false;
  }

  trocarTurno() {
    this.turno = this.turno === 0 ? 1 : 0;
  }

  getJogadorAtual() {
    return this.jogadores[this.turno];
  }

  avaliarAcao(jogador, action) {
    const pet = jogador.pet;
    let pontos = 0;

    if (action === "feed") {
      if (pet.hunger < 70) pontos = 10;
      else pontos = 3;
      pet.feed();
    }

    if (action === "bath") {
      if (pet.cleanliness < 70) pontos = 10;
      else pontos = 3;
      pet.bath();
    }

    if (action === "play") {
      if (pet.happiness < 70) pontos = 10;
      else pontos = 3;
      pet.play();
    }

    if (action === "sleep") {
      if (pet.energy < 70) pontos = 10;
      else pontos = 3;
      pet.sleep();
    }

    if (pet.hunger === 0 || pet.cleanliness === 0 || pet.happiness === 0 || pet.energy === 0) {
      pontos -= 5;
    }

    jogador.addPoints(pontos);
    return pontos;
  }

  decairPets() {
    this.jogadores.forEach((jogador) => {
      const antes = jogador.pet.getAverage();
      jogador.pet.decay();
      const depois = jogador.pet.getAverage();

      if (depois < antes && depois <= 25) {
        jogador.addPoints(-2);
      }
    });
  }

  diminuirTempo() {
    if (this.tempo > 0) {
      this.tempo--;
    }

    if (this.tempo <= 0) {
      this.finalizado = true;
    }
  }

  getVencedor() {
    const [j1, j2] = this.jogadores;

    if (j1.pontos > j2.pontos) return j1;
    if (j2.pontos > j1.pontos) return j2;

    const avg1 = j1.pet.getAverage();
    const avg2 = j2.pet.getAverage();

    if (avg1 > avg2) return j1;
    if (avg2 > avg1) return j2;

    return null;
  }
}

window.Tamagotchi = Tamagotchi;
window.Jogador = Jogador;
window.Jogo = Jogo;