import { createSlice } from '@reduxjs/toolkit'
import gql from '../scripts/graphql'
import { dynamicSort } from '../scripts/sorting'

function defaults() {
  return { departments: [], departmentIndex: -1 }
}

const slice = createSlice({
  name: 'department',
  initialState: defaults(),
  reducers: {
    updateDepartments: (state, action) => ({
      ...defaults(),
      departments: action.payload
    }),
    updateDepartmentIndex: (state, action) => ({
      ...state,
      departmentIndex: action.payload
    })
  }
})

export default slice.reducer

export function getDepartments(instituteId) {
  return (dispatch, getState) => {
    // const stateBefore = getState()
    // if (stateBefore.department.departments.length) return

    Promise.resolve(
      gql(`
        {
          departments(
            instituteId: ${instituteId}
          ) {
            _id
            name
          }
        }
      `).then((data) => data.departments.sort(dynamicSort('name')))
    ).then((gqlData) => {
      if (gqlData) {
        // Reset index to avoid array out of bounds
        dispatch(slice.actions.updateDepartmentIndex(-1))
        dispatch(slice.actions.updateDepartments(gqlData))
      }
    })
  }
}

export function updateDepartmentIndex(index) {
  return (dispatch) => {
    dispatch(slice.actions.updateDepartmentIndex(index))
  }
}

export function selectDepartments(state) {
  return state.department.departments
}

export function selectDepartment(state) {
  return state.department.departments[state.departments.departmentIndex]
}

export function selectDepartmentIndex(state) {
  return state.department.departmentIndex
}
