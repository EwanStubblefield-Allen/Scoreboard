let players = []


function addPlayer(event) {
  event.preventDefault()
  let form = event.target
  let player = {
    id: generateID(),
    name: form.name.value,
    score: 0
  }
  let index = players.find(player => player.name == form.name.value)
  if (index || player.name == "") {
    document.getElementById("name").placeholder = "Use a different Name"
  } else {
    players.push(player)
    document.getElementById("name").placeholder = "Name"
    savePlayers()
  }
  form.reset()
}

function savePlayers() {
  window.localStorage.setItem("players", JSON.stringify(players))
  drawPlayers()
}

function loadPlayers() {
  let storedPlayers = JSON.parse(window.localStorage.getItem("players"))
  if (storedPlayers) {
    players = storedPlayers
  }
}


function drawPlayers() {
  let playerListElement = document.getElementById("players")
  let playersTemplate = ""
  players.forEach(player => {
    playersTemplate += `
  <div class="col-3 text-center p-3">
    <div class="score-board">
      <button class="btn button score-text" onclick="clearPlayers('${player.id}')">${player.name}</button>
      <p class="score">${player.score}</p>
    </div>
    <div class="d-flex flex-column align-items-center">
      <button onclick="addScore('${player.id}', 1)" class="btn button score-button my-3">${player.name} +1</button>
      <button onclick="addScore('${player.id}', 3)" class="btn button score-button">${player.name} +3</button>
    </div>
  </div>
    `
  })
  playerListElement.innerHTML = playersTemplate
}

function findPlayerById(id) {
  let index = players.findIndex(player => player.id == id)
  if (index == -1) {
    throw new Error("invalid Player Id")
  }
  return index
}

function addScore(id, scoreAdded) {
  let player = players[findPlayerById(id)]
  player.score += scoreAdded
  savePlayers()
}

function reset() {
  for (let i = 0; i < players.length; i++) {
    players[i].score = 0
  }
  savePlayers()
}

function clearPlayers(id) {
  players.splice(findPlayerById(id), 1)
  savePlayers()
}

function generateID() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadPlayers()
drawPlayers()