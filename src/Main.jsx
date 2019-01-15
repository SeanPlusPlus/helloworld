import React from 'react'
import {
  Alert, Row, Col,
} from 'reactstrap'
import { useGlobal, setGlobal } from 'reactn'

const Main = () => {
  const [alert] = useGlobal('alert')
  const [highlight] = useGlobal('highlight')
  return (
    <div id="main">
      <Row>
        <Col sm="12">
          <Alert color="secondary" id="main-alert">
            {(typeof alert === 'string' && alert)}
            { (alert || (highlight && highlight.length > 0)) && (
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
        </Col>
      </Row>
    </div>
  )
}

export default Main
