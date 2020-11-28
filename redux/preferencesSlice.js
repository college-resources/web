import { createSlice } from '@reduxjs/toolkit'
import gql from '../scripts/graphql'

const slice = createSlice({
  name: 'preferences',
  initialState: {
    preferences: {}
  },
  reducers: {
    updatePreferences: (state, action) => {
      state.preferences = action.payload
    }
  }
})

export default slice.reducer

export function getPreferences() {
  return (dispatch, getState) => {
    const stateBefore = getState()
    if (stateBefore.preferences.preferences) return

    Promise.resolve(
      gql(`
        {
          user {
            preferences {
              user
              feeding
              department
              semester
              courses
              theme
            }
          }
        }
        `).then((data) => data.user.preferences)
    ).then((gqlData) => {
      if (gqlData) {
        dispatch(slice.actions.updatePreferences(gqlData))
      }
    })
  }
}

export function selectPreferences(state) {
  return state.preferences.preferences
}
