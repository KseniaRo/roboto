import axios from 'axios'

//ACTION TYPES

const GET_ROBOT = 'GET_ROBOT'

//ACTION CREATOR
export const getRobot = (robot) => {
  return {
    type: GET_ROBOT,
    robot
  }
}
//THUNK

export const fetchRobot = (robotId) => {
  return async (dispatch, getState) => {
    try {
      // console.log('this is GETSTATE',getState())
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
      // console.log('this is get_robot in redux singlerobot', action.robot)
      return action.robot
    default:
      return state
  }
}
