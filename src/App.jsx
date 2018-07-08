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
    if (action === 'Chargers') {
      const idx = _.findIndex(games, (g) => {
        return (
          g.home.team.name === action ||
          g.away.team.name === action 
        )
      })
      if (idx > -1) {
        console.log(games[idx])
      } else {
        console.log('No Chargers Game Found')
      }
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

    return (
      <div className="App">
        <h1 className="title">NFL Week 1 Scoreboard</h1>
        <hr />
        <div id="actions">
          <Button
            className="btn"
            variant="outlined"
            color="primary"
            onClick={() => this.handleClick('highest', gamesArray)}
          >
            Highest Score
          </Button>
          <Button
            className="btn"
            variant="outlined"
            color="primary"
            onClick={() => this.handleClick('Chargers', gamesArray)}
          >
            Chargers 
          </Button>
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
