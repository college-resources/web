import React, { useContext, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Semester from '../../components/Semester'
import gql from '../../scripts/graphql'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import UserContext from './../../components/UserContext'

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
          name
          semester
          department {
            name
          }
        }
      }
    `).then(data => data.lessons)
)

function Index (props) {
  const [lessons, setLessons] = useState([])
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

  return (
    <Container>
      {user && (
        <Link href='/lesson-list/create'>
          <Button variant='contained' color='primary' className={classes.button}>
            Create Lesson
          </Button>
        </Link>
      )}
      <div style={{ marginTop: '16px' }}>
        <Semester rows={lessons} />
      </div>
    </Container>
  )
}

export default Index
