import { createSlice } from '@reduxjs/toolkit'
import gql from '../scripts/graphql'
import { dynamicSort } from '../scripts/sorting'

function defaults() {
  return { institutes: [], instituteIndex: -1 }
}

const slice = createSlice({
  name: 'institute',
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
    if (stateBefore.institute.institutes.length) return

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
      `).then((data) => data.institutes?.sort(dynamicSort('acronym')))
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
  return state.institute.institutes
}

export function selectInstitute(state) {
  return state.institute.institutes[state.institutes.instituteIndex]
}

export function selectInstituteIndex(state) {
  return state.institute.instituteIndex
}
