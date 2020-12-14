import axios from 'axios'

//ACTION TYPES

const GET_ROBOT = 'GET_ROBOT'


//ACTION CREATORS
export const getRobot = (robot) => {
  return {
    type: GET_ROBOT,
    robot
  }
}

//THUNKS

export const fetchRobot = (robotId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/api/robots/${robotId}`)
      dispatch(getRobot(data))
    } catch (err) {
      console.log(err)
    }
  }
}


const initialState = {}
//REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROBOT:
      return action.robot
    default:
      return state
  }
}
