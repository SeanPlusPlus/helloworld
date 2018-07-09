import React from 'react'
import _ from 'lodash'
import Button from '@material-ui/core/Button'

const handleClick = (action, games) => {
  // chargers game
  if (action === 'Chargers') {
    const idx = _.findIndex(games, (g) => {
      return (
        g.home.team.name === action ||
        g.away.team.name === action 
      )
    })
    if (idx > -1) {
      console.log('Chargers Game Info:', games[idx])
    } else {
      console.log('No Chargers Game Found')
    }
    return
  }

  // best offense 
  if (action === 'Best Offense') {
    const home = _.map(games, (g) => {
      return {
        team: _.get(g, 'home.team.name'),
        score: _.get(g, 'home.team.score'),
      }
    })
    const away = _.map(games, (g) => {
      return {
        team: _.get(g, 'away.team.name'),
        score: _.get(g, 'away.team.score'),
      }
    })
    const scores = _.concat(home, away)
    const offense = _.maxBy(scores, (g) => {
      return g.score 
    })
    console.log('Best Offense:', offense.team)
    return
  }

  // best defense
  if (action === 'Best Defense') {
    console.log('*', action, '*')
    return
  }

  console.log(action, games)
}

const Action = ({ name, games }) => (
  <Button
    className="btn"
    variant="outlined"
    color="primary"
    onClick={
      () => handleClick(name, games)
    }
  >
   {name}
  </Button>
)

export default Action