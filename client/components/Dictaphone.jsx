import React, { PropTypes, Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

import {getVideos} from '../actions/videos'
import {connect} from 'react-redux'
import Video from './Video'
const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

// var actual = 'Get to the chopper'
// var actual = this.props.videos.quote

// function straightLace (stopListening, transcript) {
//   stopListening()
//   console.log(transcript, actual)
//   if (transcript.toLowerCase() === actual.toLowerCase()) {
//     console.log('Correct!')
//   } else {
//     console.log("That's not it.")
//   }
// }

class Dictaphone extends Component {
  constructor (props) {
    super(props)
    this.state = {
      randomVid: null
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!this.state.randomVid) this.setState({randomVid: nextProps.videos[Math.floor(Math.random() * nextProps.videos.length)]})
  }
  componentDidMount () {
    this.props.dispatch(getVideos())
  }
  render () {
    const { transcript, startListening, stopListening, browserSupportsSpeechRecognition } = this.props
    const {randomVid} = this.state
    function compareText () {
      stopListening()
      var points = 0
      var actual = randomVid.quote
      console.log('quote from database = ', randomVid.quote)
      console.log('transcript = ' + transcript) // look at final transcript
      transcript.toLowerCase().split(' ').forEach((char, idx, transcriptArr) => {
        const actualArr = actual.toLowerCase().split(' ')
        if (actualArr.find(actualChar => actualChar == char)) points++
      })
      if (transcript.toLowerCase() === actual.toLowerCase()) {
        console.log('Correct, double points!')
        points = points * 2
      } else {
        console.log('Not quite...')
      }
      console.log('points: ' + points)
    }
    if (!browserSupportsSpeechRecognition) {
      return null
    }
    // const {randomVid} = this.state
    return (
      <div>
        {randomVid &&<Video randomVid={randomVid}/>}
        <button onClick={startListening}>Speak</button>
        <button onClick={compareText.bind(null, stopListening, transcript)}>Stop/Submit</button>
        <br/>
        <input type="text" value={transcript} id="speech-field"/>
        <br/>
        {randomVid && <p>{randomVid.quote}</p>}
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes

const options = {
  autoStart: false
}

const mapStateToProps = (state) => {
  return {
    videos: state.videos
  }
}

export default connect(mapStateToProps)(SpeechRecognition(options)(Dictaphone))
