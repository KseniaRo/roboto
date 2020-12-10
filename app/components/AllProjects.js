import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../redux/projects'
import { Link } from 'react-router-dom'
import CreateProject from './CreateProject'

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  constructor() {
    super()

  }
  componentDidMount() {
    this.props.loadProjects()
  }
  // addToState(){
  //   this.set
  // }
  render() {
    return (
      <div >
        {
          this.props.projects.map(project => (
            <Link to={`/projects/${project.id}`} key={project.id}>
              <h3>{project.title}</h3>
              <p>
                {project.deadline}
              </p>
            </Link>
          ))
        }
        <h2>Create New Project:</h2>
        <div><CreateProject /></div>
        <h2>End of Form</h2>
      </div>)
  }
}

const mapState = (state) => {
  return {
    projects: state.projects
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProjects: () => dispatch(fetchProjects())

  };
};

export default connect(mapState, mapDispatch)(AllProjects);
