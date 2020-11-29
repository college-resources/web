import { createSlice } from '@reduxjs/toolkit'
import gql from '../scripts/graphql'

export const PREFERENCE_FEEDING = 'feeding'

const slice = createSlice({
  name: 'preferences',
  initialState: {},
  reducers: {
    updatePreferences: (state, action) => ({
      ...state,
      preferences: action.payload
    }),
    updatePreference: (state, action) => ({
      ...state,
      [action.payload.preference]: action.payload.value
    })
  }
})

export default slice.reducer

export function getPreferences() {
  return (dispatch, getState) => {
    const stateBefore = getState()
    if (stateBefore.preferences) return

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

export function updatePreference(parameters) {
  return (dispatch) => {
    dispatch(slice.actions.updatePreference(parameters))
  }
}

export function selectPreferences(state) {
  return state.preferences
}
