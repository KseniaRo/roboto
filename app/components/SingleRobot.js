import React from 'react'
import { connect } from 'react-redux'
import { fetchRobot } from '../redux/singleRobot'
import { Link } from 'react-router-dom'
import UpdateRobot from './UpdateRobot'

class SingleRobot extends React.Component {
  componentDidMount() {
    // console.log('this is single robot components this.props.match.params.robotId', this.props.match.params.robotId)
    this.props.loadRobot(this.props.match.params.robotId)
  }
  render() {
    // console.log('this is this.props.robot in component SingleRobot', this.props.robot.name)
    const projects = this.props.robot.projects || []
    // console.log(this.props.robot.projects)
    // console.log(projects)
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
        {projects.length ? projects.map((project) => (<p key={project.id}><Link to={`/projects/${project.id}`}>{project.title}</Link></p>)) : <p> {this.props.robot.name} doesn't have any projects in progress.</p>}
        <Link to="/robots"><button type="button" >back to all robots</button></Link>
        <UpdateRobot robotId={this.props.match.params.robotId} />
      </div>
    )
  }

}
const mapStateToProps = (state) => {
  // console.log('mapStatetoprops, state ', state)
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
