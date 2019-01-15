import React from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import { setGlobal } from 'reactn'

const scores = (games) => {
  const home = _.map(games, g => ({
    team: _.get(g, 'home.team.name'),
    score: _.get(g, 'home.team.score'),
  }))
  const away = _.map(games, g => ({
    team: _.get(g, 'away.team.name'),
    score: _.get(g, 'away.team.score'),
  }))
  return _.concat(home, away)
}


const Action = ({ name, games }) => {
  const handleClick = (action, gameData) => {
    // chargers game
    if (action === 'Chargers') {
      const game = _.find(gameData, g => (
        g.home.team.name === action
          || g.away.team.name === action
      ))
      const answer = `${game.home.team.name}: ${game.home.team.score} ⚡️${game.away.team.name}: ${game.away.team.score}` // eslint-disable-line max-len
      setGlobal({ answer })
    }

    // best offense
    if (action === 'Best Offense') {
      const offense = _.maxBy(scores(games), g => g.score)
      const answer = `${action}: ${offense.team}`
      setGlobal({ answer })
    }

    // high scoring games
    if (action === 'High Scoring') {
      const highScoring = _.filter(games, (g) => {
        const home = _.get(g, 'home.team.score')
        const away = _.get(g, 'away.team.score')
        return (home > 20 && away > 20)
      })
      const answer = _.map(highScoring, h => (h.idx))
      setGlobal({ answer })
    }

    // best defense
    if (action === 'Best Defense') {
      const answer = `${action}: ?`
      setGlobal({ answer })
    }
  }

  return (
    <Button
      className="btn"
      color="primary"
      onClick={
        () => handleClick(name, games)
      }
    >
      {name}
    </Button>
  )
}

export default Action
