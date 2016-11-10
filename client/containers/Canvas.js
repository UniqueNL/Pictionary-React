import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import updateGame from '../actions/update-game'

class Canvas extends Component {

  componentDidMount() {
    // draw full here
    const self = this

    this.points = []

    let canvas = this.refs.canvas

    let lastX = 0
    let lastY = 0
    let isDrawing = false

    canvas.onmousedown = (e) => {
      let mouseX = e.offsetX
      let mouseY = e.offsetY
      lastX = mouseX
      lastY = mouseY
      isDrawing = true
    }

    canvas.onmousemove = (e) => {

      if (!isDrawing) return

      let mouseX = e.offsetX
      let mouseY = e.offsetY
      this.points.push({ pointX: mouseX, pointY: mouseY })
    }

    document.onmouseup = (e) => {
      isDrawing = false
      this.points.push({ pointX: 0, pointY: 0 })
    }

    this.syncDraw()
    this.drawFull()
  }

  syncDraw() {
    console.log('syncing...')
    if (this.points.length > 0) {
      const { game, updateGame } = this.props
      updateGame(game, { drawingPoints: game.drawingPoints.concat(
        this.points.filter((p, index) => {
          const { pointX, pointY } = p
          return (index % 7 === 0 || (pointX === 0 && pointY === 0))
        })
      )})
      this.points = []
    }

    setTimeout(() => {
      this.syncDraw()
    }, 300)
  }

  componentDidUpdate() {
    // new props were received, so draw new points
    this.drawFull()
  }

  drawFull() {
    // draw all points in the game's drawingPoints array. Start from the top.
    const { game } = this.props
    const self = this
    game.drawingPoints.reduce((prev, next) => {
      const prevPoint = Object.assign({}, prev)
      const nextPoint = Object.assign({}, next)
      self.drawPoint(prevPoint, nextPoint)
      return next
    }, { pointX: 0, pointY: 0 })
  }

  drawPoint(prev, next) {
    let canvas = this.refs.canvas
    let context = canvas.getContext('2d')

    if ((prev.pointX === 0 && prev.pointY === 0) || (next.pointX === 0 && next.pointY === 0)) {
      context.moveTo(next.pointX, next.pointY)
    } else {
      context.moveTo(prev.pointX, prev.pointY)
      context.lineTo(next.pointX, next.pointY)
    }

    context.strokeStyle = "black"
    context.closePath()
    context.stroke()
  }


  render() {
    const { game } = this.props
    return (
      <div>
        <canvas width={400} height={300} id='canvas' ref='canvas' />
      </div>
    )
  }
}

export default connect(null, {updateGame})(Canvas)
