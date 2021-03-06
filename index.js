import Character from "./Character.js"
import characterData from "./data.js"
import { getRandomItemInArray, getHeroPlaceholderHtml } from "./utils.js"

let wizard = {}
let monster = {}

let monstersArray = ["orc", "goblin", "troll", "demon", "dragon"]
let heroesArray = ["warrior", "wizard"]
let isWaiting = false

const typeCharacter = true

function getNewMonster() {
  const monster = getRandomItemInArray(monstersArray)
  const monstersIndex = monstersArray.indexOf(monster)
  monstersArray.splice(monstersIndex, 1)
  return monster ? new Character(characterData[monster]) : {}
}

function getNewHeroes() {
  const hero = getRandomItemInArray(heroesArray)
}

function attack() {
  if (!isWaiting) {
    wizard.setDiceHtml()
    monster.setDiceHtml()
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    renderCharacter()

    if (wizard.dead) {
      endGame()
    } else if (monster.dead) {
      isWaiting = true
      if (monstersArray.length > 0) {
        setTimeout(() => {
          monster = getNewMonster()
          isWaiting = false
          renderCharacter()
        }, 1000)
      }
    }
  } 
}

function startGame() {
  wizard = new Character(characterData.wizard)
  monster = getNewMonster()
  document.getElementById("start-button").style.display = "none"
  renderCharacter()
  renderAction()
}

function endGame() {
  isWaiting = true
  const endMessage = wizard.dead && monster.dead ? "No victors - all creatures are dead" : wizard.health > 0 ? "The Wizard Wins" : `The ${monster.name} are Victorious!`

  const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
  setTimeout(() => {
    document.body.innerHTML = `
              <div class="end-game">
                  <h2>Game Over</h2> 
                  <h3>${endMessage}</h3>
                  <p class="end-emoji">${endEmoji}</p>
              </div>
              `
  }, 1500)
}

// Event Listeners
document.getElementById("start-button").addEventListener("click", startGame)
document.getElementById("attack-button").addEventListener("click", attack)

// Render Functions
function renderCharacter() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
  document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

function renderAction() {
  document.getElementById("attack-button").style.display = "block"
}

function renderBegin() {
  document.getElementById("attack-button").style.display = "none"
  // document.getElementById("hero").innerHTML = getHeroPlaceholderHtml(heroesArray)
  
}

renderBegin()
