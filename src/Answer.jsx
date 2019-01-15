import React from 'react'
import { Alert } from 'reactstrap'

const getAnswer = () => {
  return ''
}

const Answer = () => (
  <div id="answer">
    <Alert color="secondary">
      { getAnswer() }
    </Alert>
  </div>
)

export default Answer 