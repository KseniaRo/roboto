import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import AllRobots from './AllRobots'
import AllProjects from './AllProjects'
import SingleRobot from './SingleRobot'

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>Welcome!
          <Link to="/robots">Go to Robots</Link>
          <Link to="/projects">Go to Projects</Link>
        </nav>
        <main>
          <h1>
            Welcome to StackBot Project Management: your robot employees are
            awaiting assignments!
          </h1>
          <div><Route exact path="/projects" component={AllProjects} />
            <Route exact path="/robots" component={AllRobots} />
            <Route path="/robots/:robotId" component={SingleRobot} />
          </div>

        </main>
      </div>
    </Router>
  );
};

export default Routes;
