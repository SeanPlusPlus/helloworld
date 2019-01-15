import React from 'react'
import { useState, useEffect } from 'react';
import _ from 'lodash'
import { Row, Col } from 'reactstrap';
import './App.css'
import Game from './Game'
import Action from './Action'
import Answer from './Answer'

const App = () => {
  const [games, setGames] = useState([])
  const [title] = useState('NFL 2016 Week 1 Scoreboard')
  
  useEffect(() => {
    const url = '/californiastoke/nfl2016.json'
    fetch(url)
      .then((response) => (
        response.json()
      ))
      .then((json) => {
        const { nfl } = json
        const games = _.get(nfl, '[0].games').map((g, idx) => ({...g, idx}))
        setGames(games)
      })
  }, [])

  const renderGame = (game) => {
    return <Game data={game} key={game.idx} />
  }

  const renderAction = (games, name, idx) => {
    return <Action name={name} games={games} key={idx} />
  }

  const gameElements = _.map(games, renderGame)
  
  const cols = _.chunk(gameElements, 4)

  // button actions
  const actionsArray = [
    'Best Offense',
    'Chargers',
    'High Scoring',
    'Best Defense',
  ]

  // array of action elements
  const actions = _.map(actionsArray, _.curry(renderAction)(games))

  return (
    <div className="App">
      <h1 className="title">{title}</h1>
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

export default App
