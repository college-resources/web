import { createSlice } from '@reduxjs/toolkit'
import gql from '../scripts/graphql'

const slice = createSlice({
  name: 'institutes',
  initialState: {},
  reducers: {
    updateInstitutes: (state, action) => ({
      ...action.payload
    })
  }
})

export default slice.reducer

export function getInstitutes() {
  return (dispatch, getState) => {
    const stateBefore = getState()
    if (stateBefore.institutes.length) return

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

export function selectInstitutes(state) {
  return state.institutes
}
