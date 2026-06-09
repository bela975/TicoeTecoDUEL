
# Tico e Teco: Duel
A multiplayer virtual pet game built with **React**, **Node.js**, **Express**, and **Socket.IO**.

In **Tico e Teco: Duel**, two players compete by taking care of their own virtual pets, **Tico** and **Teco**, in real time. The goal is to maintain the best pet condition, earn points through strategic actions, and outperform the opponent before the match timer reaches zero.

## Overview

This project is a multiplayer reinterpretation of the classic virtual pet concept.

Unlike the original local version, this edition was rebuilt using a **client-server architecture**, allowing players to participate from different computers. The game state, rules, timer, scoring system, and turn management are entirely controlled by the backend, while the frontend is responsible for rendering the interface and sending player actions.

## Technologies Used

### Frontend
- React
- Vite
- Socket.IO Client
- CSS3

### Backend
- Node.js
- Express
- Socket.IO
- CORS

## Architecture

The application follows a multiplayer client-server architecture:

```text
┌─────────────────┐       Socket.IO       ┌─────────────────┐
│    Player 1     │ ◄──────────────────► │                 │
│   React Client  │                      │                 │
└─────────────────┘                      │                 │
                                         │     Backend     │
┌─────────────────┐       Socket.IO      │   Game Logic    │
│    Player 2     │ ◄──────────────────► │                 │
│   React Client  │                      │                 │
└─────────────────┘                      └─────────────────┘
```

The backend is responsible for:

- Managing game rooms
- Validating player actions
- Controlling turns
- Maintaining scores
- Updating pet attributes
- Running the game timer
- Determining the winner

## Game Objective

Each match lasts **60 seconds**.

Players must continuously monitor their pets' needs and choose the most appropriate action to maintain their condition and maximize their score.

At the end of the match:

1. The player with the highest score wins.
2. In case of a tie, the average pet condition is used as a tiebreaker.

## 🐾 Pet Attributes

Each pet has four main attributes:

| Attribute | Description |
|------------|------------|
| Hunger | Indicates how well-fed the pet is |
| Cleanliness | Indicates the pet's hygiene |
| Happiness | Indicates emotional well-being |
| Energy | Indicates how rested the pet is |

These attributes decrease automatically over time.

## Available Actions

| Action | Primary Effect |
|----------|----------------|
| Feed | Increases hunger level |
| Bath | Improves cleanliness |
| Play | Increases happiness |
| Sleep | Restores energy |

Actions may also affect secondary attributes, creating strategic decision-making opportunities.

## Turn System

The game uses an alternating turn system.

- Only one player can act at a time.
- The active player's panel is highlighted.
- After a valid action, the turn automatically switches to the opponent.
- Turn validation is handled by the backend.

## Scoring System

Players receive points based on the usefulness of their actions.

### Positive Scoring
- Performing actions that address a critical need.
- Maintaining good overall pet condition.

### Reduced Rewards
- Performing unnecessary actions.

### Penalties
- Allowing attributes to reach critical levels.
- Poor pet maintenance over time.

## User Interface

The game interface includes:

- Individual player panels
- Animated pet sprites
- Real-time status bars
- Turn indicators
- Live scoreboard
- Match timer
- Action history table
- Dynamic pet needs list
- Match result screen

## Multiplayer Features

- Room creation system
- Join by room code
- Real-time synchronization
- Backend-controlled game state
- Support for players on different computers
- Socket.IO communication

---

## Project Structure

```text
TicoeTecoDUEL/
│
├── backend/
│   ├── server.js
│   ├── gameLogic.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── README.md
└── .gitignore
```

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Academic Context

This project was developed as part of a Front-End Development course assignment.

### Requirements fulfilled

- React-based implementation
- No direct DOM manipulation
- Multiplayer gameplay
- Backend-controlled game logic
- Real-time communication using Socket.IO
- Client-server architecture
- Turn-based gameplay
- Scoring and ranking system

## Authors

Developed by:

- Maria Luísa Vieira Arruda
- Isabela Spinelli Ferrari Siqueira Campos Arruda

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
</head>
<body>
  <h1>Tico e Teco: duel</h1>

  <p>
    Tico e Teco: duel is a local two-player JavaScript game in which each player takes care of a virtual pet in real time.
    The winner is the player who keeps their pet in better condition and scores the most points before the timer reaches zero.
  </p>

  <h2>Overview</h2>
  <p>
    This project reinterprets the classic virtual pet concept as a competitive local multiplayer game.
    Instead of simply maintaining one pet, two human players compete side by side on the same screen while managing
    the needs of their own pets, Tico and Teco.
  </p>

  <h2>Game Objective</h2>
  <p>
    Each match lasts 60 seconds. During that time, both players must react to their pet’s changing needs and choose
    the right actions at the right moments. At the end of the match, the player with the highest score wins.
    If both players have the same score, the game uses the overall pet condition as a tiebreaker.
  </p>

  <h2>Core Mechanics</h2>
  <p>Each pet has four main attributes:</p>
  <ul>
    <li>Hunger</li>
    <li>Cleanliness</li>
    <li>Happiness</li>
    <li>Energy</li>
  </ul>

  <p>
    These attributes decrease automatically over time. Players must respond by performing actions that improve the pet’s condition.
    The available actions are:
  </p>

  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>Action</th>
        <th>Effect</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Feed</td>
        <td>Improves hunger</td>
      </tr>
      <tr>
        <td>Bath</td>
        <td>Improves cleanliness</td>
      </tr>
      <tr>
        <td>Play</td>
        <td>Improves happiness</td>
      </tr>
      <tr>
        <td>Rest</td>
        <td>Improves energy</td>
      </tr>
    </tbody>
  </table>

  <p>
    Actions are not isolated. A choice may help one attribute while slightly affecting another, which introduces strategy
    and timing into the gameplay.
  </p>

  <h2>Controls</h2>

  <h3>Player 1 - Tico</h3>
  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>Key</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>W</td>
        <td>Feed</td>
      </tr>
      <tr>
        <td>A</td>
        <td>Bath</td>
      </tr>
      <tr>
        <td>S</td>
        <td>Play</td>
      </tr>
      <tr>
        <td>D</td>
        <td>Rest</td>
      </tr>
    </tbody>
  </table>

  <h3>Player 2 - Teco</h3>
  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>Key</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Arrow Up</td>
        <td>Feed</td>
      </tr>
      <tr>
        <td>Arrow Left</td>
        <td>Bath</td>
      </tr>
      <tr>
        <td>Arrow Down</td>
        <td>Play</td>
      </tr>
      <tr>
        <td>Arrow Right</td>
        <td>Rest</td>
      </tr>
    </tbody>
  </table>

  <h2>Turn System</h2>
  <p>
    The game uses an alternating turn system. Only one player can act at a time, and the active player’s panel is highlighted.
    After a valid action is performed, the turn automatically switches to the other player.
  </p>

  <h2>Scoring System</h2>
  <p>The score is based on the quality and timing of player actions:</p>
  <ul>
    <li>Useful actions performed at the right time award more points</li>
    <li>Unnecessary actions award fewer points</li>
    <li>Allowing a pet to reach a critical condition may result in penalties</li>
  </ul>

  <h2>Game Interface</h2>
  <p>The game screen includes the following elements:</p>
  <ul>
    <li>A dedicated panel for each player</li>
    <li>Animated pet sprites</li>
    <li>Status bars for hunger, cleanliness, happiness, and energy</li>
    <li>A dynamic action history table</li>
    <li>A dynamic needs list for each pet</li>
    <li>A visible timer</li>
    <li>A live scoreboard with player names and points</li>
  </ul>


 <h2>More documentation:</h2>
<li>https://docs.google.com/document/d/1T85oktD46usFF0oG4qagxSbRB9b1sgTsfLwkrEBocMU/edit?usp=sharing</li>
