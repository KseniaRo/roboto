import axios from 'axios'

//ACTION TYPES

const GET_PROJECT = 'GET_PROJECT'


//ACTION CREATORS
export const getProject = (project) => {
  return {
    type: GET_PROJECT,
    project
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

// I know how to do thunk request to update. I just didn't use it, because i didn't store this information in the store.

const initialState = {}
//REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT:
      return action.project
    default:
      return state
  }
}
