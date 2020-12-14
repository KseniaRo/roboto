import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../redux/projects'
import { Link } from 'react-router-dom'
import CreateProject from './CreateProject'
import axios from 'axios'

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {

  componentDidMount() {
    this.props.loadProjects()
  }
  async handleRemove(projectId) {
    await axios.delete(`api/projects/${projectId}`)
    this.props.loadProjects()
  }

  render() {
    return (
      <div >
        {
          this.props.projects.map(project => (
            <div key={project.id}>
              <Link to={`/projects/${project.id}`} >
                <h3>{project.title}</h3>
                <p>
                  {project.deadline}
                </p>
              </Link>
              <button className="del" onClick={() => this.handleRemove(project.id)} type="button" > X {project.title}</button>
            </div>
          ))
        }
        <h2>Create New Project:</h2>
        <div><CreateProject /></div>

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
