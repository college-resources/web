import { createSlice } from '@reduxjs/toolkit'
import gql from '../scripts/graphql'

const slice = createSlice({
  name: 'feeding',
  initialState: {
    feedings: [],
    feedingIndex: '',
    weekIndex: 0
  },
  reducers: {
    updateFeeding: (state, action) => {
      state.feedings = action.payload
    },
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

export function getFeeding () {
  return (dispatch, getState) => {
    const stateBefore = getState()
    if (stateBefore.feeding.feedings.length) return

    Promise.resolve(gql(`
      query {
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
        `)
      .then((data) => data.feeding))
      .then((gqlFeeding) => {
        if (gqlFeeding) {
          dispatch(slice.actions.updateFeeding(gqlFeeding))
        }
      })
  }
}

export function updateFeeding (index) {
  return (dispatch) => {
    dispatch(slice.actions.updateSelectedWeekIndex(0))
    dispatch(slice.actions.updateSelectedFeedingIndex(index))
  }
}

export function updateWeek (value) {
  return (dispatch) => {
    dispatch(slice.actions.updateSelectedWeekIndex(value))
  }
}

export function selectFeedings (state) {
  return state.feeding.feedings
}

export function selectFeeding (state) {
  return state.feeding.feedings[state.feeding.feedingIndex]
}

export function selectFeedingIndex (state) {
  return state.feeding.feedingIndex
}

export function selectWeekIndex (state) {
  return state.feeding.weekIndex
}
