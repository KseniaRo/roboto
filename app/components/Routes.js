import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import AllRobots from './AllRobots'
import AllProjects from './AllProjects'
import SingleRobot from './SingleRobot'
import SingleProject from './SingleProject'
import Home from './Home'

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <div className="nav-main">
            <Link className="a" to="/">HOME</Link>
            <nav className="nav-menu"> <Link className="a" to="/robots">Go to Robots</Link>
              <Link className="a" to="/projects">Go to Projects</Link>
            </nav>

          </div>

        </nav>
        <main>
          <h1 className="welcome">
            Welcome to StackBot Project Management: your robot employees are
            awaiting assignments!
          </h1>
          <div className="route">
            <Route exact path="/projects" component={AllProjects} />
            <Route exact path="/" component={Home} />
            <Route exact path="/robots" component={AllRobots} />
            <Route path="/robots/:robotId" component={SingleRobot} />
            <Route path="/projects/:projectId" component={SingleProject} />
          </div>

        </main>
      </div>
    </Router>
  );
};

export default Routes;
