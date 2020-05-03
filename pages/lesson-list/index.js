import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { dynamicSortMultiple } from '../../scripts/sorting'
import groupBy from '../../scripts/groupBy'
import gql from '../../scripts/graphql'
import Semester from '../../components/Semester'
import UserContext from '../../components/UserContext'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  input: {
    display: 'none'
  }
}))

const lessonHandler = () => Promise.resolve(
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
        }
      }
    `).then(data => data.lessons && data.lessons.sort(dynamicSortMultiple('semester', 'lessonCode')))
)

export default function Index (props) {
  const [lessons, setLessons] = useState([])
  const [semesters, setSemesters] = useState([])
  const classes = useStyles()
  const { user } = useContext(UserContext)

  useEffect(() => {
    props.updateTitle('Lesson List')
    lessonHandler().then(gqlLessons => {
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
      {user && (
        <>
          <Link href='/lesson-list/create'>
            <Button variant='contained' color='primary' className={classes.button}>
              Create Lesson
            </Button>
          </Link>
        </>
      )}
      <Box mt={2}>
        <Grid container spacing={3}>
          {semesters.map((sem, index) => (
            <Grid item xs={12} md={6} key={'semester-' + index}>
              <Semester rows={sem} semester={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
