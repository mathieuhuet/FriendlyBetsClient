export const betOptions = {
  drink: '🍷 Drink',
  roundDrink: '🍻 Pay a round of drink',
  shots: '🥃 Shots',
  money: '💸 Money',
  charity: '⛑ Charity donation',
  gift: '🎁 Gift',
  meal: '🍝 Meal',
  chore: '🧹 Chore',
  custom: '⚙️ Custom'
}

export const getBetOptions = (color: string): string => {
  switch (color) {
    case 'drink' : {
      return "🍷 Drink"
    }
    case 'roundDrink' : {
      return "🍻 Pay a round of drink"
    }
    case 'shots' : {
      return "🥃 Shots"
    }
    case 'money' : {
      return "💸 Money"
    }
    case 'charity' : {
      return "⛑ Charity donation"
    }
    case 'gift' : {
      return "🎁 Gift"
    }
    case 'meal' : {
      return "🍝 Meal"
    }
    case 'chore' : {
      return "🧹 Chore"
    }
    case 'custom' : {
      return "⚙️ Custom"
    }
    default : {
      return "error"
    }
  }
}