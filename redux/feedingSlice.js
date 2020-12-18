import { createSlice } from '@reduxjs/toolkit'
import gql from '../scripts/graphql'

function defaults() {
  return { feedings: [], feedingIndex: -1, weekIndex: 0 }
}

const slice = createSlice({
  name: 'feeding',
  initialState: defaults(),
  reducers: {
    updateFeeding: (state, action) => ({
      ...defaults(),
      feedings: action.payload
    }),
    updateSelectedFeedingIndex: (state, action) => ({
      ...state,
      feedingIndex: action.payload
    }),
    updateSelectedWeekIndex: (state, action) => ({
      ...state,
      weekIndex: action.payload
    })
  }
})

export default slice.reducer

export function getFeeding() {
  return (dispatch, getState) => {
    const stateBefore = getState()
    // TODO: Caching
    // if (stateBefore.feeding.feedings.length) return

    const selectedInstituteIndex = stateBefore.institute.instituteIndex

    if (selectedInstituteIndex < 0) return

    const selectedInstituteId =
      stateBefore.institute.institutes[selectedInstituteIndex]._id

    Promise.resolve(
      gql(`
        {
          feedings (
            instituteId: "${selectedInstituteId}"
          ) {
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
      `).then((data) => data.feedings)
    ).then((gqlFeeding) => {
      if (gqlFeeding) {
        dispatch(slice.actions.updateFeeding(gqlFeeding))
      }
    })
  }
}

export function updateFeeding(index) {
  return (dispatch) => {
    dispatch(slice.actions.updateSelectedWeekIndex(0))
    dispatch(slice.actions.updateSelectedFeedingIndex(index))
  }
}

export function updateWeek(value) {
  return (dispatch) => {
    dispatch(slice.actions.updateSelectedWeekIndex(value))
  }
}

export function selectFeedings(state) {
  return state.feeding.feedings
}

export function selectFeeding(state) {
  return state.feeding.feedings[state.feeding.feedingIndex]
}

export function selectFeedingIndex(state) {
  return state.feeding.feedingIndex
}

export function selectWeekIndex(state) {
  return state.feeding.weekIndex
}
