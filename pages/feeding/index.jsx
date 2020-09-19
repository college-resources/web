import React, { useEffect } from 'react'
import { getFeeding, selectFeedingIndex, selectFeedings, updateFeeding } from 'redux/feedingSlice'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Menu from 'components/feeding/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'gray'
      }
    },
    '& label.Mui-focused': {
      color: theme.palette.type === 'dark' && theme.palette.common.white
    },
    width: '100%'
  }
}))

export default function FeedingPage (props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const feedings = useSelector(selectFeedings)
  const selectedFeedingIndex = useSelector(selectFeedingIndex)

  useEffect(
    () => {
      props.updateTitle('Feeding')
      dispatch(getFeeding())
    },
    []
  )

  function handleFeedingChange (event) {
    dispatch(updateFeeding(event.target.value))
  }

  return (
    <Container>
      <form
        autoComplete="off"
        className={classes.container}
        noValidate
      >
        <TextField
          className={classes.textField}
          id="restaurant"
          label="Restaurant"
          margin="normal"
          onChange={handleFeedingChange}
          select
          value={selectedFeedingIndex}
          variant="outlined"
        >
          {feedings.map((feed, index) => (
            <MenuItem
              key={feed._id}
              value={index}
            >
              {feed.name}
            </MenuItem>
          ))}
        </TextField>
      </form>
      {selectedFeedingIndex === '' ? (
        <Box mt={5}>
          <Typography align="center">
            Select a restaurant from the dropdown to see its menu.
          </Typography>
        </Box>
      ) : (
        <Menu />
      )}
    </Container>
  )
}
