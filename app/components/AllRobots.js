import React from 'react';
import { connect } from 'react-redux';
import { fetchRobots } from '../redux/robots'
import { Link } from 'react-router-dom'
import CreateRobot from './CreateRobot'

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends React.Component {

  componentDidMount() {
    this.props.loadRobots()
  }
  render() {
    return (
      <div >
        {
          this.props.robots.map(robot => (
            <Link to={`/robots/${robot.id}`} key={robot.id}>
              <h3> {robot.name}</h3>
              <p>
                <img src={robot.imageUrl} />
              </p>
            </Link>
          ))
        }
        <h2>Create New Robot:</h2>
        <div><CreateRobot /></div>
        <h2>End of Form</h2>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    robots: state.robots
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadRobots: () => dispatch(fetchRobots())

  };
};

export default connect(mapState, mapDispatch)(AllRobots);
