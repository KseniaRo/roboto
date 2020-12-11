import React from 'react'
import { connect } from 'react-redux'
import { fetchProject } from '../redux/singleProject'
import { Link } from 'react-router-dom'

class SingleProject extends React.Component {
  componentDidMount() {

    this.props.loadProject(this.props.match.params.projectId)
  }
  render() {
    console.log('this is rpojects in singelProject state', this.props.project)
    const robots = this.props.project.robots || []
    return (
      <div >
        <div >
          <h1>{this.props.project.title}</h1>
          <p>DEADLINE:{this.props.project.deadline}</p>
          <p>PRIORITY:{this.props.project.priority}</p>
          <p>DESCRIPTION:{this.props.project.description}</p>
        </div>
        <h3>Assign Robots:</h3>
        <ul>{robots.length ? robots.map((robot) => (<p key={robot.id}><Link to={`/robots/${robot.id}`} >{robot.name}</Link></p>)) : <p> {this.props.project.title} doesn't have any assigned robots.</p>}</ul>
        <Link to="/projects"><button type="button" >back to all projects</button></Link>
      </div>
    )
  }

}
const mapStateToProps = (state) => {
  // console.log('mapStatetoprops, state ', state)
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
