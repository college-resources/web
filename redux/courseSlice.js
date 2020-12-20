import { createSlice } from '@reduxjs/toolkit'
import gql from '../scripts/graphql'
import { dynamicSortMultiple } from '../scripts/sorting'

function defaults() {
  return { courses: [] }
}

const slice = createSlice({
  name: 'course',
  initialState: defaults(),
  reducers: {
    updateCourses: (state, action) => ({
      ...defaults,
      courses: action.payload
    })
  }
})

export default slice.reducer

export function getCourses() {
  return (dispatch, getState) => {
    // TODO: Caching
    const stateBefore = getState()

    const selectedDepartmentIndex = stateBefore.department.departmentIndex

    if (selectedDepartmentIndex < 0) return

    const selectedDepartmentId =
      stateBefore.department.departments[selectedDepartmentIndex]._id

    Promise.resolve(
      gql(`
        {
          lessons(
            departmentId: "${selectedDepartmentId}"
          ) {
            _id
            lessonCode
            name
            semester
            type
            hoursTheory
            hoursLab
            credit
          }
        }
      `).then((data) =>
        data.lessons?.sort(dynamicSortMultiple('semester', 'lessonCode'))
      )
    ).then((gqlData) => {
      if (gqlData) {
        dispatch(slice.actions.updateCourses(gqlData))
      }
    })
  }
}

export function selectCourses(state) {
  return state.course.courses
}
