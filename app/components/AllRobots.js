import React from 'react';
import { connect } from 'react-redux';
import { fetchRobots } from '../redux/robots'
import { Link } from 'react-router-dom'
import CreateRobot from './CreateRobot'
import axios from 'axios'

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

export class AllRobots extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     robots: []
  //   }
  // }
  componentDidMount() {
    this.props.loadRobots()
  }

  async handleRemove(robotId) {
    // console.log('this is this.props.robots', this.props.robots)
    const res = await axios.delete(`api/robots/${robotId}`)
    // console.log('this is respond from server ', res)
    // this.setState({
    //   robots: this.props.robots.filter((robot) => {
    //     if (robot.id !== robotId) return robot
    //   })
    // })
    // console.log(this.state)
    this.props.loadRobots()
  }

  render() {
    return (
      <div >
        <h3> List of all robots:</h3>
        {
          this.props.robots.map(robot => (
            <div key={robot.id}>
              <Link to={`/robots/${robot.id}`} >
                <h3> {robot.name}</h3>
                <p>
                  <img src={robot.imageUrl} />
                </p>
              </Link>
              <button onClick={() => this.handleRemove(robot.id)} type="button" >X {robot.name}</button>
            </div>

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
