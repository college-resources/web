import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Hidden from '@material-ui/core/Hidden'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import Menu from './Menu'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFeeding,
  selectFeedingIndex,
  selectFeedings,
  updateFeeding
} from 'redux/feedingSlice'
import {
  getPreferences,
  PREFERENCE_FEEDING,
  selectPreferences,
  updatePreference
} from 'redux/preferencesSlice'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'
import { selectInstituteIndex } from 'redux/instituteSlice'
import { isEmpty } from 'lodash'

const useStyles = makeStyles((theme) => ({
  checked: {
    color: pink['A400']
  },
  container: {
    display: 'flex'
  },
  textField: {
    flexGrow: 1,
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'gray'
      }
    },
    '& label.Mui-focused': {
      color: theme.palette.type === 'dark' && theme.palette.common.white
    }
  }
}))

export default function Feeding() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const feedings = useSelector(selectFeedings)
  const selectedFeedingIndex = useSelector(selectFeedingIndex)
  const selectedInstituteIndex = useSelector(selectInstituteIndex)
  const preferences = useSelector(selectPreferences)
  const [favoriteFeeding, setFavoriteFeeding] = useState(null)
  const [displayAsFavorite, setDisplayAsFavorite] = useState(false)

  useEffect(() => {
    dispatch(getFeeding())
    dispatch(getPreferences())
  }, [])

  useEffect(() => {
    dispatch(getFeeding())
  }, [selectedInstituteIndex])

  useEffect(() => {
    setFavoriteFeeding(preferences ? preferences.feeding : null)
  }, [preferences])

  // Automatically go to favorite feeding on page load
  useEffect(() => {
    if (favoriteFeeding)
      feedings?.map((feed, index) => {
        if (favoriteFeeding._id === feed._id) dispatch(updateFeeding(index))
      })
  }, [favoriteFeeding, feedings])

  // If the user has a favorite feeding and it's the same as the currently
  // selected one, display it to the user as favorite
  useEffect(() => {
    setDisplayAsFavorite(isFavorite())
  }, [favoriteFeeding, feedings, selectedFeedingIndex])

  function handleFavoriteChange() {
    if (selectedFeedingIndex >= 0) {
      dispatch(
        updatePreference({
          preference: PREFERENCE_FEEDING,
          value: isFavorite() ? null : feedings[selectedFeedingIndex]
        })
      )
    } else {
      alert('Choose a feeding first') // TODO: Beautify - Translate
    }
  }

  function isFavorite() {
    return (
      !!favoriteFeeding &&
      favoriteFeeding._id === feedings[selectedFeedingIndex]?._id
    )
  }

  function handleFeedingChange(event) {
    dispatch(updateFeeding(event.target.value))
  }

  return (
    <>
      <Box className={classes.container}>
        <TextField
          className={classes.textField}
          id="restaurant"
          label="Restaurant"
          margin="normal"
          onChange={handleFeedingChange}
          select
          value={selectedFeedingIndex >= 0 ? selectedFeedingIndex : ''}
          variant="outlined"
        >
          {isEmpty(feedings) ? (
            <MenuItem value={-1}>No restaurants found</MenuItem>
          ) : (
            feedings.map((feed, index) => (
              <MenuItem key={feed._id} value={index}>
                {feed.name}
              </MenuItem>
            ))
          )}
        </TextField>
        <Hidden smUp>
          <FormControlLabel
            style={{ marginLeft: '4px', marginRight: 0, marginTop: '8px' }}
            control={
              <Checkbox
                checked={displayAsFavorite}
                onChange={handleFavoriteChange}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite className={classes.checked} />}
                name="checkedH"
              />
            }
            label=""
          />
        </Hidden>
        <Hidden xsDown>
          <FormControlLabel
            style={{ marginLeft: '4px', marginRight: 0, marginTop: '8px' }}
            control={
              <Checkbox
                checked={displayAsFavorite}
                onChange={handleFavoriteChange}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite className={classes.checked} />}
                name="checkedH"
              />
            }
            label="Favourite"
          />
        </Hidden>
      </Box>
      {selectedFeedingIndex < 0 ? (
        <Box mt={5}>
          <Typography align="center">
            Select a restaurant from the dropdown to see its menu.
          </Typography>
        </Box>
      ) : (
        <Menu />
      )}
    </>
  )
}
