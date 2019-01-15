import React from 'react'
import { Alert } from 'reactstrap'
import { useGlobal, setGlobal } from 'reactn'

const Answer = () => {
  const [answer] = useGlobal('answer')
  return (
    <div id="answer">
      <Alert color="secondary">
        {(typeof answer === 'string' && answer)}
        { answer && (
          <button
            onClick={
              () => { setGlobal({ answer: null }) }
            }
            type="button"
            className="close"
            aria-label="clear"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </Alert>
    </div>
  )
}

export default Answer
