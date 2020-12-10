import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchProjects } from '../redux/projects'

const defaultState = {
  taskName: '',
  assignee: '',
  errorMessage: ''
}

class CreateProject extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidUpdate() {
    this.props.loadProjects()
  }
  handleChange(event) {
    console.log('this is event.target.value in createProject', event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    // console.log('this is this.props. in cerateProjects', this.props)
    const makeProject = async () => {
      const res = await axios.post('/api/projects/', { title: this.state.title, description: this.state.description, deadline: this.state.deadline })
      console.log('this is res', res)
      console.log('this is state', this.state)
      this.setState(defaultState)
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
          <label htmlFor="taskNAme">Project Title:</label>
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
        <button type="submit">Submit</button>
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
