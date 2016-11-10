import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Canvas extends Component {

  componentDidMount() {
    let canvas = document.getElementById('canvas')
    let context = canvas.getContext('2d')

    let lastX = 0
    let lastY = 0
    let isDrawing = false

    canvas.onmousedown = function(e) {
      let mouseX = e.offsetX
      let mouseY = e.offsetY
      lastX = mouseX
      lastY = mouseY
      isDrawing = true
    }

    canvas.onmousemove = function(e) {
      if (!isDrawing) return

      let mouseX = e.offsetX
      let mouseY = e.offsetY
      context.moveTo(lastX, lastY)
      console.log(mouseX, mouseY)
      context.lineTo(mouseX, mouseY)
      context.strokeStyle = "black"
      context.closePath()
      context.stroke()

      lastX = mouseX
      lastY = mouseY
    }

    document.onmouseup = function(e) {
      isDrawing = false
    }
  }

  componentDidUpdate() {

  }



  render() {
    return (
      <div>
        <canvas width={400} height={300} id='canvas' ref='canvas' />
      </div>
    )
  }
}

export default Canvas
