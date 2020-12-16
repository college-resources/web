import { createSlice } from '@reduxjs/toolkit'
import gql from '../scripts/graphql'

function defaults() {
  return { institutes: [], instituteIndex: -1 }
}

const slice = createSlice({
  name: 'institutes',
  initialState: defaults(),
  reducers: {
    updateInstitutes: (state, action) => ({
      ...defaults(),
      institutes: action.payload
    }),
    updateInstituteIndex: (state, action) => ({
      ...state,
      instituteIndex: action.payload
    })
  }
})

export default slice.reducer

export function getInstitutes() {
  return (dispatch, getState) => {
    const stateBefore = getState()
    if (stateBefore.institutes.institutes.length) return

    Promise.resolve(
      gql(`
        {
          institutes {
            _id
            name
            acronym
            feedings {
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
      `).then((data) => data.institutes)
    ).then((gqlData) => {
      if (gqlData) {
        dispatch(slice.actions.updateInstitutes(gqlData))
      }
    })
  }
}

export function updateInstituteIndex(index) {
  return (dispatch) => {
    dispatch(slice.actions.updateInstituteIndex(index))
  }
}

export function selectInstitutes(state) {
  return state.institutes.institutes
}

export function selectInstitute(state) {
  return state.institutes.institutes[state.institutes.instituteIndex]
}

export function selectInstituteIndex(state) {
  return state.institutes.instituteIndex
}
