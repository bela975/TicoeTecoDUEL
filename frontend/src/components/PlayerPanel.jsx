import React from "react";
import { getPetImage, effectImages } from "../assets/images.js";

export default function PlayerPanel({
  jogador,
  playerNumber,
  active,
  isMe,
  canPlay,
  onAction,
  effect
}) {
  if (!jogador) {
    return (
      <section className="player-panel waiting-panel">
        <h2>Jogador {playerNumber}</h2>
        <p>Aguardando jogador entrar...</p>
      </section>
    );
  }

  const pet = jogador.pet;
  const petImage = getPetImage(pet.baseName, pet.visualState);
  const effectImage = effect ? effectImages[effect] : null;

  return (
    <section className={`player-panel ${active ? "active-turn" : ""}`}>
      <div className="player-header">
        <h2>
          Jogador {playerNumber}: {jogador.nome} {isMe ? "(Você)" : ""}
        </h2>

        <span className="score-box">{jogador.pontos} pontos</span>
      </div>

      <div className="pet-area">
        <img
          className={`pet-image ${effect ? "pet-bounce" : ""}`}
          src={petImage}
          alt={pet.baseName}
        />

        {effectImage && (
          <div className="effect-layer">
            <img
              className="effect-icon"
              src={effectImage}
              alt={`Efeito ${effect}`}
            />
          </div>
        )}
      </div>

      <div className="status-bars">
        <StatusBar label="Fome" value={pet.hunger} className="hunger" />
        <StatusBar label="Limpeza" value={pet.cleanliness} className="clean" />
        <StatusBar label="Felicidade" value={pet.happiness} className="happy" />
        <StatusBar label="Energia" value={pet.energy} className="energy" />
      </div>

      <div className="actions">
        <button
          className="action-btn"
          disabled={!canPlay}
          onClick={() => onAction("feed")}
        >
          Alimentar
        </button>

        <button
          className="action-btn"
          disabled={!canPlay}
          onClick={() => onAction("bath")}
        >
          Banho
        </button>

        <button
          className="action-btn"
          disabled={!canPlay}
          onClick={() => onAction("play")}
        >
          Brincar
        </button>

        <button
          className="action-btn"
          disabled={!canPlay}
          onClick={() => onAction("sleep")}
        >
          Dormir
        </button>
      </div>

      <div className="needs-box">
        <h3>Necessidades</h3>

        <ul className="needs-list">
          {pet.needs.map((need, index) => (
            <li key={index}>{need}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatusBar({ label, value, className }) {
  return (
    <div className="bar-group">
      <label>
        {label}: {value}
      </label>

      <div className="bar">
        <div className={`fill ${className}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}