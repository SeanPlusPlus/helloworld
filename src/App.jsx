import React, { Component } from 'react'
import _ from 'lodash'
import { ListGroup } from 'reactstrap'
import './App.css'
import Game from './Game'
import Action from './Action'
import Answer from './Answer'

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

  renderAction(games, name, idx) {
    return <Action name={name} games={games} key={idx} />
  }

  render() {
    // get array of games
    const gamesArray = _.get(this, 'state.games', [])

    // array of rendered games
    const games = _.map(gamesArray, this.renderGame) 

    // function to render game
    const renderAction = this.renderAction

    // button actions
    const actionsArray = [
      'Best Offense',
      'Chargers',
      'High Scoring',
      'Best Defense',
    ]

    // array of rendered actions
    const actions = _.map(actionsArray, _.curry(renderAction)(gamesArray))

    return (
      <div className="App">
        <h1 className="title">NFL Week 1 Scoreboard</h1>
        <hr />
        <div id="actions">
          { actions }
        </div>
        <Answer />
        <ListGroup id="games">
          { games }
        </ListGroup>
      </div>
    )
  }
}

export default App
