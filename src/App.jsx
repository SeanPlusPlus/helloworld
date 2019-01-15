import React, { Component } from 'react'
import _ from 'lodash'
import { Row, Col } from 'reactstrap';
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
    
    // games by column
    const cols = [
      _.filter(games, (g, i) => (i < 4)),
      _.filter(games, (g, i) => (i >= 4) && i < 8),
      _.filter(games, (g, i) => (i >= 8) && i < 12),
      _.filter(games, (g, i) => (i >= 12)),
    ]

    // button actions
    const actionsArray = [
      'Best Offense',
      'Chargers',
      'High Scoring',
      'Best Defense',
    ]

    // array of rendered actions
    const actions = _.map(actionsArray, _.curry(this.renderAction)(gamesArray))

    return (
      <div className="App">
        <h1 className="title">NFL Week 1 Scoreboard</h1>
        <hr />
        <div id="actions">
          { actions }
        </div>
        <Answer />
        <div id="games">
          <Row>
            { _.map(cols, (col, i) => (
              <Col key={i} sm="2">
                { col }
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }
}

export default App
