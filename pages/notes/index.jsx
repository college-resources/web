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
      lessons {
        _id
        name
    }
    }
    `).then((data) => data.lessonNotes && data.lessonNotes.sort(dynamicSortMultiple(
  'name'
))))

export default function CoursesPage (props) {
  const [
    lessons,
    setLessons,
    lessonNotes,
    setLessonNotes
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
      notesHandler().then((gqlLessonNotes) => {
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
        getOptionLabel={(option) => option.name}
        id='combo-box-demo'
        options={lessonNotes}
        renderInput={(params) => (<TextField
          {...params}
          label='Combo box'
          variant='outlined'
          fullWidth
        />)}
      />
    </Container>
  )
}
