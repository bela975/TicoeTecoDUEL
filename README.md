<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Tico e teco: duel - README</title>
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
