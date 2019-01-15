import React from 'react'
import _ from 'lodash'
import { ListGroupItem, CardBody, Card, Media } from 'reactstrap'
import teams from './teams'

const icon = (name) => {
  const base = 'https://s3-us-west-1.amazonaws.com/cse-tools/logos/nfl/'
  if (name === null) {
    return `${base}nfl.png`
  }
  return `${base}${teams[name]}.png`
}

const Game = ({ data }) => (
  <ListGroupItem className="game">
    <Card>
      <CardBody>
        <Media>
          <img
            src={icon(_.get(data, 'home.team.name', null))}
            alt="logo"
            className="logo"
          />
          <div className="score">
            {_.get(data, 'home.team.score', 'Ø') }
          </div>
        </Media>
        <Media>
          <img
            src={icon(_.get(data, 'away.team.name', null))}
            alt="logo"
            className="logo"
          />
          <div className="score">
            { _.get(data, 'away.team.score', 'Ø') }
          </div>
        </Media>
      </CardBody>
    </Card>
 </ListGroupItem>
)

export default Game