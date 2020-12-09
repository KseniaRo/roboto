import axios from 'axios'

//ACTION TYPES

const GET_PROJECT = 'GET_PROJECT'

//ACTION CREATOR
export const getProject = (project) => {
  return {
    type: GET_PROJECT,
    project
  }
}
//THUNK

export const fetchProject = (projectId) => {
  return async (dispatch, getState) => {
    try {
      // console.log('this is GETSTATE',getState())
      const { data } = await axios.get(`/api/projects/${projectId}`)
      dispatch(getProject(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}
//REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT:
      // console.log('this is GET_PROJECT in redux singleproject', action.project)
      return action.project
    default:
      return state
  }
}
