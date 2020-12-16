import { useEffect, useState } from 'react'
import { status as authStatus, selectStatus } from 'redux/authSlice'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import Semester from 'components/courses/Semester'
import { dynamicSortMultiple } from 'scripts/sorting'
import gql from 'scripts/graphql'
import groupBy from 'scripts/groupBy'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import InstituteSelect from 'components/InstituteSelect'
import DepartmentSelect from '../../components/DepartmentSelect'

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  input: {
    display: 'none'
  }
}))

const lessonHandler = () =>
  Promise.resolve(
    gql(`
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
`).then(
      (data) =>
        data.lessons &&
        data.lessons.sort(dynamicSortMultiple('semester', 'lessonCode'))
    )
  )

export default function CoursesPage(props) {
  const [lessons, setLessons] = useState([])
  const [semesters, setSemesters] = useState([])
  const classes = useStyles()
  const currentAuthStatus = useSelector(selectStatus)

  useEffect(() => {
    props.updateTitle('Courses')
    lessonHandler().then((gqlLessons) => {
      if (gqlLessons) {
        setLessons(gqlLessons)
      }
    })
  }, [])

  useEffect(() => {
    if (lessons.length) semesterCreator()
  }, [lessons])

  const semesterCreator = () => {
    setSemesters(groupBy(lessons, 'semester'))
  }

  return (
    <Container>
      {currentAuthStatus === authStatus.AUTHENTICATED && (
        <Link href="/courses/create">
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Create Lesson
          </Button>
        </Link>
      )}
      <InstituteSelect />
      <DepartmentSelect />
      <Box mt={2}>
        <Grid container spacing={3}>
          {semesters.map((sem, index) => (
            <Grid
              item
              // eslint-disable-next-line react/no-array-index-key
              key={`semester-${index}`}
              md={6}
              xs={12}
            >
              <Semester rows={sem} semester={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
