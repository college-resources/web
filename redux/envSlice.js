import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'env',
  initialState: {
    version: null
  },
  reducers: {
    updateVersion: (state, action) => ({
      ...state,
      version: action.payload
    })
  }
})

export default slice.reducer

export function setVersion(version) {
  return (dispatch) => {
    dispatch(slice.actions.updateVersion(version))
  }
}

export function selectVersion(state) {
  return state.env.version
}
