import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchRobot } from '../redux/singleRobot'

const defaultState = {
  name: '',
  fuelLevel: 100,
  error: null
}

class UpdateRobot extends React.Component {
  constructor() {
    super()
    this.state = defaultState

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const updateRobot = async (robotId) => {
      const res = await axios.put(`/api/robots/${robotId}`, { name: this.state.name, fuelLevel: this.state.fuelLevel })
      this.setState(defaultState)
      this.props.loadUpdateRobot(this.props.robotId)
    }

    updateRobot(this.props.robotId)


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h2> Update this robot:</h2>
          <ul>
            <li>Name is requiared</li>
          </ul>
          <label htmlFor="name">Robot's NEW name:</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="fuelLevel">Fuel robot here:</label>
          <input type="number" name="fuelLevel" min="0" max="100" value={this.state.fuelLevel} onChange={this.handleChange} />
        </div>
        <button className="back" type="submit">Submit</button>
      </form>
    )
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadUpdateRobot: (robotId) => dispatch(fetchRobot(robotId))

  };
};
export default connect(null, mapDispatch)(UpdateRobot)
