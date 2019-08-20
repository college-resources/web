import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Semester from '../../components/Semester'
import gql from '../../scripts/graphql'

const lessonHandler = () => Promise.resolve(
  gql(`
      query {
        lessons {
          name
          semester
          department
        }
      }
    `).then(data => data.lessons)
)

function Index (props) {
  const [lessons, setLessons] = useState([])

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
      <div>
        <Semester rows={lessons} />
      </div>
    </Container>
  )
}

export default Index
