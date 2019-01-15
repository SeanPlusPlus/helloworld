import React from 'react'
import { Alert } from 'reactstrap'
import { useGlobal } from 'reactn'

const Answer = () => {
  const [answer] = useGlobal('answer')
  return (
    <div id="answer">
      <Alert color="secondary">
        {(typeof answer === 'string' && answer)}
      </Alert>
    </div>
  )
}

export default Answer 