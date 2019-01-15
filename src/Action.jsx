import React from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import { setGlobal } from 'reactn'

const scores = (games) => {
  const home = _.map(games, g => ({
    team: _.get(g, 'home.team.name'),
    score: _.get(g, 'home.team.score'),
    idx: g.idx,
  }))
  const away = _.map(games, g => ({
    team: _.get(g, 'away.team.name'),
    score: _.get(g, 'away.team.score'),
    idx: g.idx,
  }))
  return _.concat(home, away)
}


const Action = ({ name, games }) => {
  const handleClick = (action, gameData) => {
    // chargers game
    if (action === 'Chargers Game') {
      const game = _.find(gameData, g => (
        g.home.team.name === 'Chargers' || g.away.team.name === 'Chargers'
      ))
      const alert = `${game.home.team.name}: ${game.home.team.score} ⚡️${game.away.team.name}: ${game.away.team.score}` // eslint-disable-line max-len
      const highlight = [game.idx]
      setGlobal({ alert, highlight })
    }

    // best offense
    if (action === 'Best Offense') {
      const offense = _.maxBy(scores(games), g => g.score)
      const alert = `${action}: ${offense.team}`
      const highlight = [offense.idx]
      setGlobal({ alert, highlight })
    }

    // high scoring games
    if (action === 'High Scoring') {
      const highScoring = _.filter(games, (g) => {
        const home = _.get(g, 'home.team.score')
        const away = _.get(g, 'away.team.score')
        return (home > 20 && away > 20)
      })
      const alert = `There were ${highScoring.length} games where both teams scored more than 40`
      const highlight = _.map(highScoring, h => (h.idx))
      setGlobal({ alert, highlight })
    }

    // best defense
    if (action === 'Best Defense') {
      const alert = `${action}: ?`
      const highlight = []
      setGlobal({ alert, highlight })
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
