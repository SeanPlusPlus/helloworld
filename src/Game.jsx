import React from 'react'
import _ from 'lodash'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import teams from './teams'

const icon = (name) => {
  const base = 'https://s3-us-west-1.amazonaws.com/cse-tools/logos/nfl/'
  if (name === null) {
    return `${base}nfl.png`
  }
  return `${base}${teams[name]}.png`
}

const Game = ({ data }) => (
  <ListItem className="game">
    <Card>
      <List>
        <ListItem>
          <Avatar
            src={icon(_.get(data, 'home.team.name', null))}
          >
          </Avatar>
          <ListItemText
            primary={ _.get(data, 'home.team.score', '') }
          />
        </ListItem>
        <ListItem>
          <Avatar
            src={icon(_.get(data, 'away.team.name', null))}
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

export default Game