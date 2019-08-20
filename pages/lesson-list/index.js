import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Semester from '../../components/Semester'
import gql from '../../scripts/graphql'

export default function (props) {
  useEffect(() => {
    props.updateTitle('Lesson List')
  }, [])

  const [lessons, setLessons] = useState([])

  const lessonHandler = () => {
    gql(`
        query {
          lessons {
            name
            semester
            department
          }
        }
      `).then(data => setLessons(data.lessons))
  }

  useEffect(() => {
    lessonHandler()
  })

  return (
    <Container>
      <div>
        <Semester rows={lessons} />
      </div>
    </Container>
  )
}
