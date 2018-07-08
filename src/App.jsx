import React, { Component } from 'react'
import _ from 'lodash'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import './App.css'
import Game from './Game'

class App extends Component {
  constructor() {
    super()
    this.state = {
      games: [],
    }
  }
  
  componentDidMount() {
    const url = '/californiastoke/nfl2016.json'
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        const { nfl } = json
        const games = _.get(nfl, '[0].games')
        this.setState({
          games
        })
      })
  }

  renderGame(game, idx) {
    return <Game data={game} key={idx} />
  }

  handleClick(action, games) {
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

  render() {
    // get array of games
    const gamesArray = _.get(this, 'state.games', [])

    // function to render game
    const renderGame = this.renderGame

    // array of rendered games
    const games = _.map(gamesArray, renderGame) 

    // button actions
    const actions = [
      'Best Offense',
      'Chargers',
      'Best Defense',
    ]

    return (
      <div className="App">
        <h1 className="title">NFL Week 1 Scoreboard</h1>
        <hr />
        <div id="actions">
          {_.map(actions, (a) => (
            <Button
              key={a}
              className="btn"
              variant="outlined"
              color="primary"
              onClick={
                () => this.handleClick(a, gamesArray)
              }
            >
              {a}
            </Button>
          ))}
          <div>
            <p>
              <small>* open your dev console to see the output from the buttons</small>
            </p>
          </div>
        </div>
        <List>
          { games }
        </List>
      </div>
    )
  }
}

export default App
