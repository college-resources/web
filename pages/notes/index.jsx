import { useEffect, useState } from 'react'
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
import InstituteDepartmentGroup from 'components/InstituteDepartmentGroup'
import { useDispatch, useSelector } from 'react-redux'
import { selectDepartmentIndex } from 'redux/departmentSlice'
import { getCourses, selectCourses } from 'redux/courseSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 100,
    marginTop: 16
  },
  title: {
    fontSize: 14
  },
  autocomplete: {
    marginTop: '0.75rem',
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

const notesHandler = (courseId) =>
  Promise.resolve(
    gql(`
      {
        lessonNotes(lesson: "${courseId}") {
          _id
          date
          hypertexts
          title
          images {
            url
            details {
              url
              width
              height
            }
          }
        }
      }
    `).then(
      (data) =>
        data.lessonNotes &&
        data.lessonNotes.sort(dynamicSortMultiple('-date', 'title'))
    )
  )

export default function NotesPage(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedDepartmentIndex = useSelector(selectDepartmentIndex)
  const courses = useSelector(selectCourses)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [notes, setNotes] = useState([])
  const [dialog, setDialog] = useState({
    open: false,
    title: '',
    texts: [],
    image: []
  })

  useEffect(() => {
    if (selectedDepartmentIndex >= 0) {
      dispatch(getCourses(selectedDepartmentIndex))
    }
  }, [selectedDepartmentIndex])

  function setOpen(open) {
    setDialog({ ...dialog, open })
  }

  function handleClickOpen(title, texts, images) {
    // eslint-disable-next-line func-names
    return function () {
      setDialog({ open: true, title, texts, images })
    }
  }

  useEffect(() => {
    props.updateTitle('Notes')
  }, [])

  function changeHandler(event, newValue) {
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

  function getOptionLabelHandler(lesson) {
    return lesson.name
  }

  function groupByHandler(lesson) {
    return `Semester ${lesson.semester}`
  }

  function renderInputHandler(params) {
    return <TextField {...params} label="Course" variant="outlined" />
  }

  return (
    <Container>
      <InstituteDepartmentGroup />
      {selectedDepartmentIndex >= 0 && (
        <>
          <Autocomplete
            className={classes.autocomplete}
            fullWidth
            getOptionLabel={getOptionLabelHandler}
            groupBy={groupByHandler}
            id="notes"
            onChange={changeHandler}
            options={courses}
            renderInput={renderInputHandler}
            value={selectedLesson}
          />
          {notes?.map((note, index) => (
            <Card className={classes.root} key={`hypertext-${index}`}>
              <CardActionArea
                onClick={handleClickOpen(
                  note.title,
                  note.hypertexts,
                  note.images
                )}
              >
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {note.date}
                  </Typography>
                  <Typography component="p" variant="body2">
                    {note.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </>
      )}
      <Dialog
        images={dialog.images}
        open={dialog.open}
        setOpen={setOpen}
        texts={dialog.texts}
        title={dialog.title}
      />
    </Container>
  )
}
