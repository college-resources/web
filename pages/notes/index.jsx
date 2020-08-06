import React, { useContext, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { dynamicSortMultiple } from '../../scripts/sorting'
import gql from '../../scripts/graphql'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const lessonHandler = () => Promise.resolve(gql(`
  query {
    lessons {
      _id
      lessonCode
      name
      semester
      type
      hoursTheory
      hoursLab
      credit
      department {
        name
      }
    }
  }
`).then((data) => data.lessons && data.lessons.sort(dynamicSortMultiple(
  'semester',
  'lessonCode'
))))

const notesHandler = () => Promise.resolve(gql(`
    query {
    lessonNotes(lesson: "5d611ff874fd7b001753b7da") {
    _id
    }
    }
    `).then((data) => data.lessonNotes))

export default function CoursesPage (props) {
  const [
    lessons,
    setLessons
  ] = useState([])

  useEffect(
    () => {
      props.updateTitle('Notes')
      lessonHandler().then((gqlLessons) => {
        if (gqlLessons) {
          setLessons(gqlLessons)
        }
      })
    },
    []
  )

  useEffect(
    () => {
      lessonHandler().then((gqlLessonNotes) => {
        if (gqlLessonNotes) {
          setLessonNotes(gqlLessonNotes)
        }
      })
    },
    []
  )

  return (
    <Container>
      <Autocomplete
        getOptionLabel={(option) => option.title}
        id='combo-box-demo'
        options={top100Films}
        renderInput={(params) => (<TextField
          {...params}
          label='Combo box'
          variant='outlined'
                                  />)}
      />
    </Container>
  )
}
