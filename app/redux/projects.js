import axios from 'axios'

//ACTION TYPES

const SET_PROJECTS = 'SET_PROJECTS'

//ACTION CREATOR
export const setProjects = (project) => {
  return {
    type: SET_PROJECTS,
    payload: project
  }
}

//THUNK
export const fetchProjects = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/api/projects')
      dispatch(setProjects(data))
    } catch (err) {
      console.log(err)
    }
  }
}


const initialState = []

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.payload
    default:
      return state
  }
}

