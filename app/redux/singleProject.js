import axios from 'axios'

//ACTION TYPES

const GET_PROJECT = 'GET_PROJECT'
const UPDATE_PROJECT = 'UPDATE_PROJECT'

//ACTION CREATORS
export const getProject = (project) => {
  return {
    type: GET_PROJECT,
    project
  }
}

export const updateProject = (projectId) => {
  return {
    type: UPDATE_PROJECT,
    projectId
  }
}
//THUNKS

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

export const fetchUpdateProject = (projectId) => {
  return async (dispatch, getState) => {
    try {
      // console.log('this is GETSTATE',getState())
      const { data } = await axios.put(`/api/projects/${projectId}`)
      dispatch(updateProject(data))
    } catch (err) {
      console.log(err)
    }
  }
}
//DO i need to subdivide more since I'll use it in differnet cases?
const initialState = {}
//REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT:
      // console.log('this is GET_PROJECT in redux singleproject', action.project)
      return action.project
    case UPDATE_PROJECT:
      return //?????
    default:
      return state
  }
}
