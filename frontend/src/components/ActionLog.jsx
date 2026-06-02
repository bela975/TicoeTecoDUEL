import React from "react";

const actionNames = {
  feed: "Alimentou",
  bath: "Deu banho",
  play: "Brincou",
  sleep: "Dormiu"
};

export default function ActionLog({ logs }) {
  return (
    <section className="log-section">
      <h3>Histórico da partida</h3>

      {!logs || logs.length === 0 ? (
        <p>Nenhuma ação realizada ainda.</p>
      ) : (
        <table className="log-table">
          <thead>
            <tr>
              <th>Jogador</th>
              <th>Ação</th>
              <th>Pontos</th>
              <th>Tempo</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.jogador}</td>
                <td>{actionNames[log.action] || log.action}</td>
                <td>{log.pontos}</td>
                <td>{log.tempo}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}