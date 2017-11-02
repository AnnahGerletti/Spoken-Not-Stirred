import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { addAllPlayers } from '../actions/rounds'

class Round extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPlayer: {}
    }
    this.findNextPlayer = this.findNextPlayer.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    console.log('This is nextProps: ', nextProps)
    if (!this.state.currentPlayer) this.findNextPlayer(nextProps)
    // console.log(nextProps)
  }
  findNextPlayer (nextProps) {
    const props = nextProps || this.props
    console.log(props)
    const remainingPlayers = props.players.filter(player => !props.rounds.playerScores.find(score => score.playerid === player.id))
    console.log('This is remainingPlayers: ', remainingPlayers)
    const newPlayer = remainingPlayers[Math.round(Math.random() * remainingPlayers.length)]
    console.log('This is newPlayer: ', newPlayer)
    if (remainingPlayers.length === 0) {
      document.getElementById('next').click()
    }
    this.setState({ currentPlayer: newPlayer })
    this.props.dispatch(addAllPlayers(props.players))
  }
  componentWillMount () {
    this.props.dispatch({type: 'START_ROUND', roundNumber: 1})
  }

  nextPlayer () {
    const { players, currentPlayer, remainingPlayers } = this.state
    // mathRand over remaining players to get next player & set currentPlayer to this.

    // update remainingPlayers to filter out currentPlayer.

    // when remainingPlayers is === [], route to leaderboard page.
  }

  render () {
    const { players, rounds } = this.props
    // console.log({players, rounds}, this.state)
    return (
      <div>
        <h1>Round Page</h1>
        {/* <h2>{this.state.currentPlayer.name}</h2> */}
        <Link to="/leaderboard">
          <button id="next" className="button is large" onClick={this.nextPlayer}>
            Continue
          </button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    players: state.players,
    rounds: state.rounds
    // activePlayer: state.players[state.round.activeIndex]
  }
}

export default connect(mapStateToProps)(Round)
