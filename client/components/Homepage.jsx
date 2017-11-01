import React from 'react'
import {Link} from 'react-router-dom'

class Homepage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className="column is-4 is-desktop-only company">
        <h1>Home Page</h1>
        <Link to="/players">
          <button className="button is large">Get started</button>
        </Link>
      </div>
    )
  }
}

export default Homepage