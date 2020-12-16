import { useEffect, useState } from 'react'
import { status as authStatus, selectStatus } from 'redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, selectCourses } from 'redux/courseSlice'
import { selectDepartmentIndex } from 'redux/departmentSlice'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import Semester from 'components/courses/Semester'
import groupBy from 'scripts/groupBy'
import { makeStyles } from '@material-ui/core/styles'
import InstituteSelect from 'components/InstituteSelect'
import DepartmentSelect from 'components/DepartmentSelect'
import { isEmpty } from 'lodash'

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  input: {
    display: 'none'
  }
}))

export default function CoursesPage(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedDepartmentIndex = useSelector(selectDepartmentIndex)
  const courses = useSelector(selectCourses)
  const [semesters, setSemesters] = useState([])
  const currentAuthStatus = useSelector(selectStatus)

  useEffect(() => {
    props.updateTitle('Courses')
  }, [])

  useEffect(() => {
    if (selectedDepartmentIndex >= 0) {
      dispatch(getCourses(selectedDepartmentIndex))
    }
  }, [selectedDepartmentIndex])

  useEffect(() => {
    if (!isEmpty(courses)) {
      setSemesters(groupBy(courses, 'semester'))
    }
  }, [courses])

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
