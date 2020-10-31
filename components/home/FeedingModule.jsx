import { useEffect } from 'react'
import { getFeeding, selectFeedings } from '../../redux/feedingSlice'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import { Typography } from '@material-ui/core'
import formatMsTo24h from 'scripts/formatMsTo24h'
import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const findLastAndNextMeal = (feeding) => {
  const currentDayInWeeks = feeding.weeks.map((week) => week.days[(new Date().getDay() + 6) % 7])
  return currentDayInWeeks.map((day) => {
    let isLastOpen = false
    let lastMeal = ''
    let nextMeal = ''

    const currentTimeMs = (Date.now() - new Date().getTimezoneOffset() * 60 * 1000) % (24 * 3600 * 1000)

    day.meals.forEach((meal) => {
      if (meal.timeStart < currentTimeMs) {
        lastMeal = meal
        if (meal.timeEnd > currentTimeMs) {
          isLastOpen = true
        }
      }

      if (meal.timeStart > currentTimeMs && !nextMeal) {
        nextMeal = meal
      }
    })

    if (!nextMeal) {
      [nextMeal] = day.meals
    }

    return { isLastOpen, lastMeal, nextMeal }
  })
}

const findCurrentWeek = (feeding) => {
  const weeksLength = feeding.weeks.length
  if (weeksLength < 2) return 0

  const msInADay = 1000 * 60 * 60 * 24

  const startsFrom = new Date(feeding.startsFrom)
  const differenceBetweenStartDateAndNowInMs = Date.now() - startsFrom.getTime()
  const daysFromStart = Math.floor(differenceBetweenStartDateAndNowInMs / msInADay)
  const daysFromReset = daysFromStart % (weeksLength * 7)

  return Math.floor(daysFromReset / 7)
}

const useStyles = makeStyles((theme) => ({
  green: {
    color: green['600']
  },
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2)
  },
  red: {
    color: theme.palette.error.main
  }
}))

export default function FeedingModule () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const feedings = useSelector(selectFeedings)

  useEffect(
    () => {
      dispatch(getFeeding())
    },
    []
  )

  return (
    <Paper
      className={classes.paper}
      elevation={3}
    >
      <Box
        alignItems="center"
        css={{ height: 20 }}
        display="flex"
        justifyContent="center"
        mb={2.5}
        mt={0.5}
      >
        <RestaurantIcon />
        <Box mx={1}>
          <Typography variant="h6">
            FEEDING
          </Typography>
        </Box>
        <RestaurantIcon />
      </Box>
      <Divider />
      <Box
        pt={1}
        px={2}
      >
        {feedings.map((feed) => {
          const meals = findLastAndNextMeal(feed)
          const currentWeekIndex = findCurrentWeek(feed)
          const timeOfNextMeal = meals[currentWeekIndex].nextMeal.timeStart

          return (
            <Grid
              alignItems="flex-start"
              container
              direction="row"
              justify="space-between"
              key={feed._id}
            >
              <Box mr={2}>
                <p>
                  <b>
                    {feed.name}
                  </b>
                  {` (Week ${currentWeekIndex + 1})`}
                </p>
              </Box>
              <p>
                <span
                  className={
                    meals[currentWeekIndex].isLastOpen
                      ? classes.green
                      : classes.red
                  }
                >
                  <b>
                    {
                      meals[currentWeekIndex].isLastOpen
                        ? `Open until ${formatMsTo24h(meals[currentWeekIndex].lastMeal.timeEnd)}`
                        : 'Closed'
                    }
                  </b>
                </span>
                {' - Next meal '}
                <b>
                  {formatMsTo24h(timeOfNextMeal)}
                </b>
              </p>
            </Grid>
          )
        })}
      </Box>
    </Paper>
  )
}
