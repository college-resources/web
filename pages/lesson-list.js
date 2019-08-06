import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Lesson from '../components/lesson'

function createData (Title, Kind, Hours) {
  return { Title, Kind, Hours }
}

const rows = [
  createData('Μαθηματικά 1', 'ΥΠ', 4),
  createData('Δομημένος Προγραμματισμός', 'ΥΠ', 4),
  createData('Εισαγωγή στην Επιστήμη των Υπολογιστών', 'ΥΠ', 4)
]

export default function Index (props) {
  useEffect(() => {
    props.updateTitle('Lesson List')
  }, [])

  return (
    <Container>
      <div>
        <Lesson rows={rows} />
      </div>
    </Container>
  )
}
