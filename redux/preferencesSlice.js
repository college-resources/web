import { createSlice } from '@reduxjs/toolkit'
import gql from 'scripts/graphql'
import isEmpty from 'lodash/isEmpty'
import { status } from 'redux/authSlice'

export const PREFERENCE_FEEDING = 'feeding'

const slice = createSlice({
  name: 'preferences',
  initialState: {},
  reducers: {
    updatePreferences: (state, action) => ({
      ...action.payload
    }),
    updatePreference: (state, action) => ({
      ...state,
      [action.payload.preference]: action.payload.value
    }),
    /* eslint-disable-next-line no-unused-vars */
    clearPreferences: (state, action) => ({})
  }
})

export default slice.reducer

export function getPreferences() {
  return (dispatch, getState) => {
    const stateBefore = getState()

    // If preferences already exist or you aren't logged in, don't call the api
    if (
      !isEmpty(stateBefore.preferences) ||
      stateBefore.auth.status !== status.AUTHENTICATED
    )
      return

    Promise.resolve(
      gql(`
        {
          user {
            preferences {
              feeding {
                weeks {
                  days {
                    meals {
                      timeStart
                      timeEnd
                      menu
                    }
                  }
                }
                startsFrom
                name
                _id
              }
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

    const value = {}
    let query

    if (!parameters.value || parameters.value.length === 0) {
      query = `
        mutation {
          deletePreference(
            preference: ${parameters.preference.toUpperCase()}
          ) {
            _id
          }
        }
      `
    } else {
      if (parameters.value) {
        switch (parameters.preference) {
          case PREFERENCE_FEEDING:
            value.feeding = parameters.value?._id
            break
        }
      }

      query = `
        mutation (
          $feeding: ID,
          $department: ID,
          $semester: Int,
          $courses: [ID!],
          $theme: String,
        ) {
          updatePreferences(
            preferences: {
              feeding: $feeding,
              department: $department,
              semester: $semester,
              courses: $courses,
              theme: $theme,
            }
          ) {
            _id
          }
        }
      `
    }

    gql(query, value)
  }
}

export function selectPreferences(state) {
  return state.preferences
}

export function clearPreferences() {
  return (dispatch) => {
    dispatch(slice.actions.clearPreferences())
  }
}
