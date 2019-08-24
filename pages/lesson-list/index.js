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
          department {
            name
          }
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
      <div style={{ marginTop: '16px' }}>
        <Semester rows={lessons} />
      </div>
    </Container>
  )
}

export default Index
