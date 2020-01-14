var gameData = {
  gold: 0,
  goldMineRate: 1,
  goldPerClick: 1,
  goldPerClickCost: 10,
  goldPerClick2: 2,
  goldPerClick2Cost: 100
}

function mineGold() {
  gameData.goldMineRate = gameData.goldPerClick;
  if(gameData.goldPerClick2 > 2)
    gameData.goldMineRate += gameData.goldPerClick2;
  
  gameData.gold += gameData.goldMineRate;
    
  document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
  document.getElementById("goldMineRate").innerHTML = "Gold Mine Rate: " + gameData.goldMineRate;
}

function buyGoldPerClick() {
  gameData.goldPerClickCost = Math.floor(10 * Math.pow(1.1, gameData.goldPerClick));
  if (gameData.gold >= gameData.goldPerClickCost) {
    gameData.gold -= gameData.goldPerClickCost;
    gameData.goldPerClick += 1;
    gameData.goldPerClickCost = Math.floor(10 * Math.pow(1.1, gameData.goldPerClick));
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold";
  }
}

function buyGoldPerClick2() {
  gameData.goldPerClick2Cost = Math.floor(100 * Math.pow(1.1, gameData.goldPerClick2));
  if (gameData.gold >= gameData.goldPerClick2Cost) {
    gameData.gold -= gameData.goldPerClick2Cost;
    gameData.goldPerClick2 += 2;
    gameData.goldPerClick2Cost = Math.floor(100 * Math.pow(1.2, gameData.goldPerClick2));
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
    document.getElementById("perClickUpgrade2").innerHTML = "Upgrade Pickaxe 2 (Currently Level " + gameData.goldPerClick2 + ") Cost: " + gameData.goldPerClick2Cost + " Gold";
  }
}

function clearSavedGame() {
  localStorage.removeItem("goldMinerSave");
}

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('goldMinerSave', JSON.stringify(gameData));
}, 15000)

var savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
if (savegame !== null) {
  gameData = savegame;
}

if (typeof savegame.gold !== "undefined") gameData.gold = savegame.gold;

var mainGameLoop = window.setInterval(function() {
  mineGold();
}, 1000)
