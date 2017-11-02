import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ContactUs from './ContactUs'
import Instructions from './Instructions'
import Players from './Players'
import Homepage from './Homepage'
import Round from './Round'
import Leaderboard from './Leaderboard'

const App = () => (
  <Router>
    <div className="app-container has-text-centered">
      <Route exact path="/" component={Homepage} />
      <Route path="/aboutUs" component={ContactUs} />
      <Route path="/instructions" component={Instructions} />
      <Route path="/players" component={Players} />
      <Route path="/round" component={Round} />
      <Route path="/leaderboard" component={Leaderboard} />
    </div>
  </Router>
);

export default App
