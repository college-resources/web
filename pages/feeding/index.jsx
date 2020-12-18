import { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { useSelector } from 'react-redux'
import Feeding from 'components/feeding/Feeding'
import InstituteSelect from 'components/InstituteSelect'
import { selectInstituteIndex } from 'redux/instituteSlice'

export default function FeedingPage(props) {
  const selectedInstituteIndex = useSelector(selectInstituteIndex)

  useEffect(() => {
    props.updateTitle('Feeding')
  }, [])

  return (
    <Container>
      <InstituteSelect />
      {selectedInstituteIndex >= 0 && <Feeding />}
    </Container>
  )
}
