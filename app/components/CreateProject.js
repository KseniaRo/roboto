import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchProjects } from '../redux/projects'

const defaultState = {
  title: '',
  description: '',
  deadline: ''
}

class CreateProject extends React.Component {
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
    const makeProject = async () => {
      const res = await axios.post('/api/projects/', { title: this.state.title, description: this.state.description, deadline: this.state.deadline })
      this.setState(defaultState)
      this.props.loadProjects()
    }
    makeProject()

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <ul>
            <li>Title is requiared</li>
          </ul>
          <label htmlFor="title">Project Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="deadline">DEADLINE:</label>
          <input type="date" name="deadline" value={this.state.deadline} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="description">Project Description:<span className="warning">Describe your project here</span></label>
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
        </div>
        <button className="back" type="submit">Submit</button>
      </form>
    )
  }
}


const mapDispatch = (dispatch) => {
  return {
    loadProjects: () => dispatch(fetchProjects())

  };
};
export default connect(null, mapDispatch)(CreateProject)
