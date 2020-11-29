import { useEffect, useState } from 'react'
import {
  getFeeding,
  selectFeedingIndex,
  selectFeedings,
  updateFeeding
} from 'redux/feedingSlice'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Menu from 'components/feeding/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import { pink } from '@material-ui/core/colors'
import Hidden from '@material-ui/core/Hidden'
import {
  PREFERENCE_FEEDING,
  selectPreferences,
  updatePreference
} from 'redux/preferencesSlice'

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

export default function FeedingPage(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const feedings = useSelector(selectFeedings)
  const selectedFeedingIndex = useSelector(selectFeedingIndex)
  let { feeding: favoriteFeeding } = useSelector(selectPreferences)
  let [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    props.updateTitle('Feeding')
    dispatch(getFeeding())
  }, [])

  useEffect(() => {
    setIsFavorite(
      !!favoriteFeeding &&
        favoriteFeeding._id === feedings[selectedFeedingIndex]?._id
    )
  }, [favoriteFeeding, feedings, selectedFeedingIndex])

  function handleFavoriteChange() {
    if (selectedFeedingIndex >= 0) {
      dispatch(
        updatePreference({
          preference: PREFERENCE_FEEDING,
          value:
            !!favoriteFeeding &&
            favoriteFeeding._id === feedings[selectedFeedingIndex]?._id
              ? null
              : feedings[selectedFeedingIndex]
        })
      )
    } else {
      alert('Choose a feeding first') // TODO: Beautify - Translate
    }
  }

  function handleFeedingChange(event) {
    dispatch(updateFeeding(event.target.value))
  }

  return (
    <Container>
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
          {feedings.map((feed, index) => (
            <MenuItem key={feed._id} value={index}>
              {feed.name}
            </MenuItem>
          ))}
        </TextField>
        <Hidden smUp>
          <FormControlLabel
            style={{ marginLeft: '4px', marginRight: 0, marginTop: '8px' }}
            control={
              <Checkbox
                checked={isFavorite}
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
                checked={isFavorite}
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
