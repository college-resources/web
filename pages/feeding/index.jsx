import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Menu from 'components/feeding/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import gql from 'scripts/graphql'
import { makeStyles } from '@material-ui/core/styles'

const feedingHandler = () => Promise.resolve(gql(`
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
    `).then((data) => data.feeding))

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
  const [
    feedings,
    setFeedings
  ] = useState([])
  const [
    selectedFeedingIndex,
    setSelectedFeedingIndex
  ] = useState('')

  useEffect(
    () => {
      props.updateTitle('Feeding')
      feedingHandler().then((gqlFeeding) => {
        if (gqlFeeding) {
          setFeedings(gqlFeeding)
        }
      })
    },
    []
  )

  function handleFeedingChange (event) {
    setSelectedFeedingIndex(event.target.value)
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
        <Menu feed={feedings[selectedFeedingIndex]} />
      )}
    </Container>
  )
}
