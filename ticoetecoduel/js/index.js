const startForm = document.getElementById("startForm");

startForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const player1 = document.getElementById("player1").value.trim();
  const player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) {
    alert("Preencha o nome dos dois jogadores.");
    return;
  }

  const url = `jogo.html?j1=${encodeURIComponent(player1)}&j2=${encodeURIComponent(player2)}`;
  window.location.href = url;
});