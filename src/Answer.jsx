import React from 'react'
import { Alert } from 'reactstrap'
import { useGlobal, setGlobal } from 'reactn'

const Answer = () => {
  const [answer] = useGlobal('answer')
  const [highlight] = useGlobal('highlight')
  return (
    <div id="answer">
      <Alert color="secondary">
        {(typeof answer === 'string' && answer)}
        { (answer || highlight.length > 0) && (
          <button
            onClick={
              () => { setGlobal({ answer: null, highlight: [] }) }
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
