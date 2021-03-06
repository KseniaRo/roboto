import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchRobots } from '../redux/robots'

const defaultState = {
  name: '',
  energy: '',
}

class CreateRobot extends React.Component {
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
    const makeRobot = async () => {
      const res = await axios.post('/api/robots/', { name: this.state.name, fuelLevel: this.state.baterry })
      this.setState(defaultState)
      this.props.loadRobot()
    }
    makeRobot()
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div>
          <ul>
            <li>Name is requiared</li>
          </ul>
          <label htmlFor="name">Robot Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="energy">Fuel type:</label>
          <select name="energy" value={this.state.energy} onChange={this.handleChange}>
            <option value="electric" >ELECTRIC</option>
            <option value="gas">GAS</option>
            <option value="diesel">DIESEL</option>
          </select>
        </div>
        <button className="back" type="submit">Submit</button>
      </form>
    )
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadRobot: () => dispatch(fetchRobots())
  };
};
export default connect(null, mapDispatch)(CreateRobot)
