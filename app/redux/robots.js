import axios from 'axios'

//ACTION TYPES

const SET_ROBOTS = 'SET_ROBOTS'

//ACTION CREATOR
export const setRobots = (robots) => {
  return {
    type: SET_ROBOTS,
    payload: robots
  }
}

//THUNK
export const fetchRobots = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/api/robots')
      dispatch(setRobots(data))
    } catch (err) {
      console.log(err)
    }
  }
}


const initialState = []
// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
//REDUCER
export default function robotsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROBOTS:
      return action.payload
    default:
      return state
  }
}

