import React from 'react'
import _ from 'lodash'
import { ListGroupItem, CardBody, Card, Media } from 'reactstrap'
import { useGlobal } from 'reactn'
import teams from './teams'

const getLogo = (name) => {
  const base = 'https://s3-us-west-1.amazonaws.com/cse-tools/logos/nfl/'
  if (name === null) {
    return `${base}nfl.png`
  }
  return `${base}${teams[name]}.png`
}

const Team = ({ data }) => (
  <Media>
    <img
      src={getLogo(_.get(data, 'name', null))}
      alt="logo"
      className="logo"
    />
    <div className="score">
      {_.get(data, 'score', 'Ø') }
    </div>
  </Media>
)

const isHighScoring = (answer, idx) => (
  (Array.isArray(answer) && _.includes(answer, idx))
)

const Game = ({ data }) => {
  
  const [answer] = useGlobal('answer')
  
  return (
    <ListGroupItem className="game">
      <Card className={isHighScoring(answer, data.idx) ? 'high-scoring': 'default-game'}>
        <CardBody>
          <Team data={data.home.team} />
          <Team data={data.away.team} />
        </CardBody>
      </Card>
  </ListGroupItem>
  )
}

export default Game