import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import setUpGames from '../actions/setup-games'
import setGameId from '../actions/set-current-game'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import saveGame from '../actions/update-game'
import Canvas from './Canvas'
import './Game.sass'

const PLAYER_COLORS = ['#018ae1', '#f8da27', '#b912de']

class Game extends Component {
  constructor() {
    super()
    this.state = {
      word: null
    }
  }

  componentWillMount() {
    this.props.setGameId(this.props.routeParams.gameId)
    this.props.setUpGames()
  }

  isPlayer() {
    const { game, currentUser } = this.props
    return game.players.filter((player) =>
      player.userId === currentUser._id).length > 0
  }

  canJoin() {
    if (this.isPlayer()) { return false }
    const { game } = this.props
    return game.players.length < 4
  }

  joinGame() {
    const { game, saveGame, currentUser } = this.props
    saveGame(game, { players: game.players.concat({
      userId: currentUser._id,
      name: currentUser.name,
      points: currentUser.points,
      color: PLAYER_COLORS[game.players.length],
    })})
  }


  generateWord() {
    const listOfWords = ['book', 'table', 'chair']
    let chosenWord = listOfWords[Math.floor(Math.random() * listOfWords.length)];
    console.log('Generated word:', chosenWord)
  }

  checkWord(event) {
    event.preventDefault()

    if (this.refs.guessWord.value === this.props.word) {
      alert("got it")
      this.generateWord.bind(this)
    }
    this.refs.guessWord.value = ""
  }


  render() {
    const { game } = this.props
    if (!!!game._id) { return null }

    if (this.canJoin()) {
      return (
        <Paper zDepth={3} className="join-game">
          <h3>Join this Game?</h3>
          <p>Join { game.players.map((player) => player.name).join(' and ') } in this game.</p>
          <RaisedButton label="Join" primary={true} onClick={ this.joinGame.bind(this) } />
          <Link to="/"><FlatButton label="Back to the Lobby" /></Link>
        </Paper>
      )
    }

    return(
      <div className="game">
        <div className="player-list">
        Current players:
          <ul>
            { game.players.map((player) => {
              return <li>{player.name}{player.points}
              <i>:</i>
              </li>
            }) }
          </ul>
        </div>
        <Canvas />
        <div>
          { console.log()}
          <form onSubmit={this.checkWord.bind(this)}>
            <input type="text" ref="guessWord" className="inputWord"></input>
            <input type="button" ref="generateWord" onClick={this.generateWord.bind(this)}></input>
            <div>
              <em>Insert a word and press ENTER to submit.</em>
            </div>
          </form>
        </div>

      </div>
    )
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    game: state.games.reduce((currentGame, nextGame) => {
      return nextGame._id === state.currentGame ? nextGame : currentGame
    }, {}),
    currentUser: state.currentUser,
  }
}

// <p>Is player: { this.isPlayer() ? 'Yes' : 'No' }</p>
// <p>Can join: { this.canJoin() ? 'Yes' : 'No' }</p>

export default connect(mapStateToProps, { setUpGames, setGameId, saveGame })(Game)
