import React from 'react'
import { Alert } from 'reactstrap'
import { useGlobal, setGlobal } from 'reactn'

const Main = () => {
  const [alert] = useGlobal('alert')
  const [highlight] = useGlobal('highlight')
  return (
    <div id="alert">
      <Alert color="secondary">
        {(typeof alert === 'string' && alert)}
        { (alert || highlight.length > 0) && (
          <button
            onClick={
              () => { setGlobal({ alert: null, highlight: [] }) }
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

export default Main
