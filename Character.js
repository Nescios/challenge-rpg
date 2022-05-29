import { getDicePlaceholderHtml, getDiceRollArray } from "./utils.js"

class Character {
  constructor(data) {
    Object.assign(this, data)
    this.maxHealth = this.health
    this.diceHtml = getDicePlaceholderHtml(this.diceCount)
  }

  setDiceHtml() {
    this.currentDiceScore = getDiceRollArray(this.diceCount)
    this.diceHtml = this.currentDiceScore.map(score =>
      `<div class="dice">${score}</div>`).join('')
  }

  takeDamage(attackScoreArray) {
    const totalDamage = attackScoreArray.reduce((total, score) => total + score)
    this.health -= totalDamage
    if (this.health <= 0) {
      this.dead = true
      this.health = 0
    }
  }

  getHealthBarHtml() {
    const percent = (this.health / this.maxHealth) * 100
    return `
    <div class="health-bar-outer">
      <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
        style="width:${percent}%;">
      </div>
    </div>`
  }

  getCharacterHtml() {
    const { name, avatar, health, diceCount, currentDiceScore, items, diceHtml } = this
    const healthBar = this.getHealthBarHtml()
    return `
      <div class="character-card">
        <h4 class="name">${name}</h4>
        <img class="avatar" src="${avatar}" alt="${name}">
        <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
        <div class="dice-container">${diceHtml}</div>
    `
  }
}

export default Character