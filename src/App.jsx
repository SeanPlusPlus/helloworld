import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import _ from 'lodash'

import './App.css'
import teams from './teams'

const icon = (name) => (
  `https://s3-us-west-1.amazonaws.com/cse-tools/logos/nfl/${teams[name]}.png`
)

const Game = ({ data }) => (
  <ListItem className="game">
    <Card>
      <List>
        <ListItem>
          <Avatar
            src={icon(_.get(data, 'home.team.name', ''))}
          >
          </Avatar>
          <ListItemText
            primary={ _.get(data, 'home.team.score', '') }
          />
        </ListItem>
        <ListItem>
          <Avatar
            src={icon(_.get(data, 'away.team.name', ''))}
          >
          </Avatar>
          <ListItemText
            primary={ _.get(data, 'away.team.score', '') }
          />
        </ListItem>
      </List>
    </Card>
 </ListItem>
)

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

  render() {
    const { games } = this.state
    return (
      <div className="App">
        <List>
          { games.map((g, idx) => <Game data={g} key={idx} />) }
        </List>
      </div>
    )
  }
}

export default App
