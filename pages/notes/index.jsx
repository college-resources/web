import React, { useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import Dialog from 'components/notes/Dialog'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { dynamicSortMultiple } from 'scripts/sorting'
import gql from 'scripts/graphql'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 100,
    marginTop: 16
  },
  title: {
    fontSize: 14
  },
  autocomplete: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'gray'
      }
    },
    '& label.Mui-focused': {
      color: theme.palette.type === 'dark' && theme.palette.common.white
    }
  }
}))

const courseHandler = () => Promise.resolve(gql(`
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

const notesHandler = (courseId) => Promise.resolve(gql(`
  query {
    lessonNotes(lesson: "${courseId}") {
      _id
      hypertexts
    }
  }
`).then((data) => data.lessonNotes))

export default function NotesPage (props) {
  const classes = useStyles()
  const [
    lessons,
    setLessons
  ] = useState([])
  const [
    selectedLesson,
    setSelectedLesson
  ] = useState(null)
  const [
    notes,
    setNotes
  ] = useState([])
  const [
    dialog,
    setDialog
  ] = React.useState({ open: false, text: '' })

  function setOpen (open) {
    setDialog({ ...dialog, open })
  }

  function handleClickOpen (text) {
    // eslint-disable-next-line func-names
    return function () {
      setDialog({ open: true, text })
    }
  }

  useEffect(
    () => {
      props.updateTitle('Notes')
      courseHandler().then((gqlLessons) => {
        if (gqlLessons) {
          setLessons(gqlLessons)
        }
      })
    },
    []
  )

  function changeHandler (event, newValue) {
    setSelectedLesson(newValue)
    if (newValue) {
      notesHandler(newValue._id).then((gqlNotes) => {
        if (gqlNotes) {
          setNotes(gqlNotes)
        }
      })
    } else {
      setNotes([])
    }
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
        label="Course"
        variant="outlined"
      />
    )
  }

  return (
    <Container>
      <Autocomplete
        className={classes.autocomplete}
        fullWidth
        getOptionLabel={getOptionLabelHandler}
        groupBy={groupByHandler}
        id="notes"
        onChange={changeHandler}
        options={lessons}
        renderInput={renderInputHandler}
        value={selectedLesson}
      />
      {
        notes && notes.map((note) => (
          note.hypertexts && note.hypertexts.map((hypertext, index) => (
            <Card
              className={classes.root}
              // eslint-disable-next-line react/no-array-index-key
              key={`hypertext-${index}`}
            >
              <CardActionArea onClick={handleClickOpen(hypertext)}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    2020 - Winter exams
                  </Typography>
                  <Typography
                    component="h2"
                    variant="h5"
                  />
                  <Typography
                    component="p"
                    variant="body2"
                  >
                    {hypertext}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ))
      }
      <Dialog
        open={dialog.open}
        setOpen={setOpen}
        text={dialog.text}
      />
    </Container>
  )
}
