import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import teams from './teams'


const icon = (name) => (
  `https://s3-us-west-1.amazonaws.com/cse-tools/logos/nfl/${teams[name]}.png`
)


const Game = ({ data }) => (
  <li className="game">
    <div id="home-team">
      <div className="team">
        <img
          alt="icon"
          className="icon"
          src={icon(_.get(data, 'home.team.name', ''))}
        />
        { _.get(data, 'home.team.score', '') }
      </div>
    </div>
    <div id="away-team">
      <div className="team">
        <img
          alt="icon"
          className="icon"
          src={icon(_.get(data, 'away.team.name', ''))}
        />
        <code>
          { _.get(data, 'away.team.score', '') }
        </code>
      </div>
    </div>
  </li>
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
        return response.json();
      })
      .then((json) => {
        const { nfl } = json
        const games = _.get(nfl, '[0].games')
        this.setState({
          games
        })
      });
  }

  render() {
    const { games } = this.state
    return (
      <div className="App">
        <ul>
          { games.map((g, idx) => <Game data={g} key={idx} />) }
        </ul>
      </div>
    );
  }
}

export default App;
