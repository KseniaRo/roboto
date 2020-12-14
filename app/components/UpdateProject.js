import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchProject } from '../redux/singleProject'

const defaultState = {
  title: '',
  completed: false,
  priority: 1
}

class UpdateProject extends React.Component {
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
    const updateProject = async (projectId) => {
      const res = await axios.put(`/api/projects/${projectId}`, { title: this.state.title, completed: this.state.completed, priority: this.state.priority })
      this.setState(defaultState)
      this.props.loadUpdateProject(this.props.projectId)
    }

    updateProject(this.props.projectId)


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h2> Update this project:</h2>
          <ul>
            <li>Title is requiared</li>
          </ul>
          <label htmlFor="title">Project's NEW title:</label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="priority">Project priority:</label>
          <input type="number" name="priority" min="1" max="10" value={this.state.priority} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="completed">Is project completed?</label>
          <select name="completed" value={this.state.completed} onChange={this.handleChange}>
            <option value="false" >No</option>
            <option value="true">Yes!</option>

          </select>
        </div>
        <button className="back" type="submit">Submit</button>
      </form>
    )
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadUpdateProject: (projectId) => dispatch(fetchProject(projectId))

  };
};
export default connect(null, mapDispatch)(UpdateProject)
