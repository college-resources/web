import { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { useSelector } from 'react-redux'
import Feeding from 'components/feeding/Feeding'
import InstituteSelect from 'components/InstituteSelect'
import { selectInstituteIndex } from 'redux/instituteSlice'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

export default function FeedingPage(props) {
  const selectedInstituteIndex = useSelector(selectInstituteIndex)

  useEffect(() => {
    props.updateTitle('Feeding')
  }, [])

  return (
    <Container>
      <InstituteSelect />
      {selectedInstituteIndex < 0 ? (
        <Box mt={5}>
          <Typography align="center">
            Select an institute from the dropdown to see its restaurants.
          </Typography>
        </Box>
      ) : (
        <Feeding />
      )}
    </Container>
  )
}
