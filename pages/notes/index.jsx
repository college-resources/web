import React, { useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { dynamicSortMultiple } from '../../scripts/sorting'
import gql from '../../scripts/graphql'

const lessonHandler = () => Promise.resolve(gql(`
  query {
    lessons {
      _id
      lessonCode
      name
      semester
    }
  }
`).then((data) => data.lessons && data.lessons.sort(dynamicSortMultiple(
  'semester',
  'lessonCode'
))))

export default function NotesPage (props) {
  const [
    lessons,
    setLessons
  ] = useState([])
  const [
    selectedLesson,
    setSelectedLesson
  ] = useState(null)

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

  function changeHandler (event, newValue) {
    setSelectedLesson(newValue)
  }

  function getOptionLabelHandler (lesson) {
    return lesson.name
  }

  function groupByHandler (lesson) {
    return `Semester ${lesson.semester}`
  }

  function renderInputHandler (params) {
    return (
      <TextField
        {...params}
        label="Controllable"
        variant="outlined"
      />
    )
  }

  return (
    <Container>
      <Autocomplete
        fullWidth
        getOptionLabel={getOptionLabelHandler}
        groupBy={groupByHandler}
        id="controllable-states-demo"
        onChange={changeHandler}
        options={lessons}
        renderInput={renderInputHandler}
        value={selectedLesson}
      />
      <div>
        {`value: ${selectedLesson ? `'${selectedLesson.name}'` : 'null'}`}
      </div>
      <Paper variant="outlined" />
    </Container>
  )
}
