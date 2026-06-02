# 🐹 Tico e Teco: Duel
A multiplayer virtual pet game built with **React**, **Node.js**, **Express**, and **Socket.IO**.

In **Tico e Teco: Duel**, two players compete by taking care of their own virtual pets, **Tico** and **Teco**, in real time. The goal is to maintain the best pet condition, earn points through strategic actions, and outperform the opponent before the match timer reaches zero.

## 🎮 Overview

This project is a multiplayer reinterpretation of the classic virtual pet concept.

Unlike the original local version, this edition was rebuilt using a **client-server architecture**, allowing players to participate from different computers. The game state, rules, timer, scoring system, and turn management are entirely controlled by the backend, while the frontend is responsible for rendering the interface and sending player actions.

## 🚀 Technologies Used

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

## 🏗 Architecture

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

## 🎯 Game Objective

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

## ⚡ Available Actions

| Action | Primary Effect |
|----------|----------------|
| Feed | Increases hunger level |
| Bath | Improves cleanliness |
| Play | Increases happiness |
| Sleep | Restores energy |

Actions may also affect secondary attributes, creating strategic decision-making opportunities.

## 🔄 Turn System

The game uses an alternating turn system.

- Only one player can act at a time.
- The active player's panel is highlighted.
- After a valid action, the turn automatically switches to the opponent.
- Turn validation is handled by the backend.

## 🏆 Scoring System

Players receive points based on the usefulness of their actions.

### Positive Scoring
- Performing actions that address a critical need.
- Maintaining good overall pet condition.

### Reduced Rewards
- Performing unnecessary actions.

### Penalties
- Allowing attributes to reach critical levels.
- Poor pet maintenance over time.

## 🖥 User Interface

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

## 🌐 Multiplayer Features

- Room creation system
- Join by room code
- Real-time synchronization
- Backend-controlled game state
- Support for players on different computers
- Socket.IO communication

---

## 📂 Project Structure

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

## ▶ Running Locally

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

## 📚 Academic Context

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

## 👩‍💻 Authors

Developed by:

- Maria Luísa Vieira Arruda
- Isabela Spinelli Ferrari Siqueira Campos Arruda