import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchRobots } from '../redux/robots'


class CreateRobot extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      battery: 0,
      energy: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    console.log('this is event.target.value', event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const makeRobot = async () => {
      const res = await axios.post('/api/robots/', { name: this.state.name, battery: this.state.baterry })
      console.log('this is res', res)
      console.log('this is state', this.state)


      this.setState(
        {
          name: '',
          battery: 1,
          energy: ''
        }
      )
    }
    makeRobot()
    this.props.loadRobots()


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div><label htmlFor="taskName">Robot Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
        </div>
        <div> <label htmlFor="battery">Battery Charge:</label>
          <input type="number" min="1" max="10" name="battery" value={this.state.battery} onChange={this.handleChange} />
        </div>
        <div>
          <select name="energy" value={this.state.energy} onChange={this.handleChange}>
            <option value="electric" >ELECTRIC</option>
            <option value="gas">GAS</option>
            <option value="diesel">DIESEL</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadRobots: () => dispatch(fetchRobots())

  };
};
export default connect(null, mapDispatch)(CreateRobot)
