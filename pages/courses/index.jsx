import { useEffect, useState } from 'react'
import { status as authStatus, selectStatus } from 'redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, selectCourses } from 'redux/courseSlice'
import { selectDepartmentIndex } from 'redux/departmentSlice'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import groupBy from 'scripts/groupBy'
import { makeStyles } from '@material-ui/core/styles'
import { isEmpty } from 'lodash'
import InstituteDepartmentGroup from 'components/InstituteDepartmentGroup'
import Semester from 'components/courses/Semester'

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    width: '100%'
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
      <InstituteDepartmentGroup />
      {selectedDepartmentIndex >= 0 && (
        <Grid container spacing={3}>
          {semesters.map((sem, index) => (
            <Grid item key={`semester-${index}`} md={6} xs={12}>
              <Semester rows={sem} semester={index} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
