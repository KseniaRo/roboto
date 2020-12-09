import { combineReducers } from 'redux';
import projectsReducer from './projects';
import robotsReducer from './robots';
import robot from './singleRobot'
import project from './singleProject'

const appReducer = combineReducers({
  projects: projectsReducer,
  robots: robotsReducer,
  robot,
  project
});

export default appReducer;
