import React from 'react'
import { connect } from 'react-redux'
import { fetchProject } from '../redux/singleProject'
import { Link } from 'react-router-dom'
import UpdateProject from './UpdateProject'
import axios from 'axios'

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.loadProject(this.props.match.params.projectId)
  }

  async unassignRobot(projectId, robotId) {
    const { data } = await axios.put(`/api/projects/${projectId}/unassign`, { robotId: robotId })

    this.props.loadProject(projectId)
  }

  async completeProject(projectId) {
    const { data } = await axios.put(`/api/projects/${projectId}/completed`, { completed: true })

    this.props.loadProject(projectId)
  }
  render() {
    const projectId = this.props.match.params.projectId
    const robots = this.props.project.robots || []
    return (
      <div >
        <div >
          <h1>{this.props.project.title}</h1>
          <p>DEADLINE:{this.props.project.deadline}</p>
          <p>PRIORITY:{this.props.project.priority}</p>
          <p>DESCRIPTION:{this.props.project.description}
          </p>
          {this.props.project.completed === false ? <div><p>Project in the progress</p><button className="unassign" onClick={() => this.completeProject(projectId)} type="button"> Complete this project</button></div> : <p> Project completed</p>}
        </div>
        <h3>Assign Robots:</h3>
        <ul>{robots.length ? robots.map((robot) => (<p key={robot.id}><Link to={`/robots/${robot.id}`} >{robot.name}</Link> <button onClick={() => this.unassignRobot(projectId, robot.id)} type="button"> Unassign</button></p>)) : <p> {this.props.project.title} doesn't have any assigned robots.</p>}</ul>
        <Link to="/projects"><button className="back" type="button" >back to all projects</button></Link>
        <UpdateProject projectId={this.props.match.params.projectId} />
      </div>
    )
  }

}
const mapStateToProps = (state) => {

  return {
    project: state.project

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadProject: (projectId) =>
      dispatch(fetchProject(projectId)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject)
