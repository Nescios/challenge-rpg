function getDiceRollArray(diceCount) {
  return new Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
}

function getRandomItemInArray(items) {
  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}

function getDicePlaceholderHtml(diceCount) {
  return new Array(diceCount).fill(0).map(() =>
  `<div class="placeholder-dice"></div>`).join('')
}

export {getDiceRollArray, getRandomItemInArray, getDicePlaceholderHtml}