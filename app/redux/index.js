import { combineReducers } from 'redux';
import projectsReducer from './projects';
import robotsReducer from './robots';
import robot from './singleRobot'

const appReducer = combineReducers({
  projects: projectsReducer,
  robots: robotsReducer,
  robot
});

export default appReducer;
