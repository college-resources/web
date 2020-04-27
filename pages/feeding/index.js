import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Menu from '../../components/feeding/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import gql from '../../scripts/graphql'

const feedingHandler = () => Promise.resolve(
  gql(`
  query {
    feeding {
      weeks {
        days {
          meals {
            timeStart
            timeEnd
            menu
          }
        }
      }
      startsFrom
      name
      _id
    }
  }
    `).then(data => data.feeding)
)

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    '& label.Mui-focused': {
      color: theme.palette.type === 'dark' && theme.palette.common.white
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'gray'
      }
    },
    width: '100%'
  }
}))

export default function Index (props) {
  const classes = useStyles()
  const [feedings, setFeedings] = useState([])
  const [selectedFeedingIndex, setSelectedFeedingIndex] = useState('')

  useEffect(() => {
    props.updateTitle('Feeding')
    feedingHandler().then(gqlFeeding => {
      if (gqlFeeding) {
        setFeedings(gqlFeeding)
      }
    })
  }, [])

  return (
    <Container>
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          id='restaurant'
          select
          className={classes.textField}
          label='Restaurant'
          value={selectedFeedingIndex}
          onChange={event => { setSelectedFeedingIndex(event.target.value) }}
          margin='normal'
          variant='outlined'
        >
          {feedings.map((feed, index) => (
            <MenuItem key={feed._id} value={index}>
              {feed.name}
            </MenuItem>
          ))}
        </TextField>
      </form>
      {selectedFeedingIndex === '' ? (
        <Box mt={5}>
          <Typography align='center'>
            Select a restaurant from the dropdown to see its menu.
          </Typography>
        </Box>
      ) : (
        <Menu feed={feedings[selectedFeedingIndex]} />
      )}
    </Container>
  )
}
