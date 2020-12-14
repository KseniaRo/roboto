import React from 'react'
import { connect } from 'react-redux'
import { fetchRobot } from '../redux/singleRobot'
import { Link } from 'react-router-dom'
import UpdateRobot from './UpdateRobot'
import axios from 'axios'

class SingleRobot extends React.Component {


  componentDidMount() {
    this.props.loadRobot(this.props.match.params.robotId)
  }

  async unassignProject(robotId, projectId) {

    await axios.put(`/api/robots/${robotId}/unassign`, { projectId: projectId })
    this.props.loadRobot(robotId)

  }

  render() {
    const robotId = this.props.match.params.robotId
    const projects = this.props.robot.projects || []
    return (
      <div >
        <div >
          <h1>{this.props.robot.name}</h1>
          <p>Energy:{this.props.robot.fuelType}</p>
          <p>Fuel Level:{this.props.robot.fuelLevel}</p>
        </div>
        <img src={this.props.robot.imageUrl} />
        <p />
        <h3>Projects:</h3>
        {projects.length ? projects.map((project) => (<p key={project.id}><Link to={`/projects/${project.id}`}>{project.title}</Link> <button className="unassign" onClick={() => this.unassignProject(robotId, project.id)} type="button"> Unassign</button></p>)) : <p> {this.props.robot.name} doesn't have any projects in progress.</p>}

        <Link to="/robots"><button className="back" type="button" >back to all robots</button></Link>
        <UpdateRobot robotId={this.props.match.params.robotId} />
      </div>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    robot: state.robot

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadRobot: (robotId) =>
      dispatch(fetchRobot(robotId)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleRobot)
