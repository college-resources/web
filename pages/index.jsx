import React, { useEffect, useState } from 'react'
import BookIcon from '@material-ui/icons/Book'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import { Typography } from '@material-ui/core'
import gql from '../scripts/graphql'
import { green } from '@material-ui/core/colors'
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
      nextMeal = day.meals[0]
    }

    return { isLastOpen, lastMeal, nextMeal }
  })
}

const findCurrentWeek = (feeding) => {
  const weeksLength = feeding.weeks.length
  if (weeksLength < 2) return 0

  const msInADay = 1000 * 60 * 60 * 24

  const startsFrom = new Date(feeding.startsFrom)
  const daysFromStart = Math.floor((Date.now() - startsFrom.getTime()) / msInADay)
  const daysFromReset = daysFromStart % (weeksLength * 7)

  return Math.floor(daysFromReset / 7)
}

const formatMs = (ms) => {
  const [time] = new Date(ms).toUTCString()
    .match(/(\d\d):(\d\d)/)
  return time
}

const useStyles = makeStyles((theme) => ({
  green: {
    color: green['600']
  },
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  red: {
    color: theme.palette.error.main
  },
  root: {
    flexGrow: 1
  }
}))

export default function Homepage (props) {
  const classes = useStyles()
  const [
    feedings,
    setFeedings
  ] = useState([])

  useEffect(
    () => {
      props.updateTitle('Home')
      feedingHandler().then((gqlFeeding) => {
        if (gqlFeeding) {
          setFeedings(gqlFeeding)
        }
      })
    },
    []
  )

  return (
    <Container>
      <Box mt={2}>
        <div className={classes.root}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Paper className={classes.paper}>
                <Box mb={2}>
                  <Typography mb={5}>
                    <RestaurantIcon />
                    <b>
                      {' '}
                      FEEDING
                      {' '}
                    </b>
                    <RestaurantIcon />
                  </Typography>
                </Box>
                <Divider />
                <Box
                  pt={1}
                  px={2}
                >
                  {feedings.map((feed) => {
                    const meals = findLastAndNextMeal(feed)
                    const currentWeekIndex = findCurrentWeek(feed)

                    return (
                      <Grid
                        alignItems="flex-start"
                        container
                        direction="row"
                        justify="space-between"
                        key={feed._id}
                      >
                        <Grid
                          alignItems="flex-start"
                          container
                          direction="row"
                          justify="space-between"
                          // eslint-disable-next-line react/no-array-index-key
                        >
                          <Box mr={2}>
                            <p>
                              <b>
                                {feed.name}
                              </b>
                              {` (Week ${currentWeekIndex + 1})`}
                            </p>
                          </Box>
                          <Divider orientation="vertical" />
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
                                    ? `Open until ${formatMs(meals[currentWeekIndex].lastMeal.timeEnd)}`
                                    : 'Closed'
                                }
                              </b>
                            </span>
                            {' - '}
                            Next meal
                            {' '}
                            <b>
                              {formatMs(meals[currentWeekIndex].nextMeal.timeStart)}
                            </b>
                          </p>
                        </Grid>
                        <Divider orientation="horizontal" />
                      </Grid>
                    )
                  })}
                </Box>
              </Paper>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Paper className={classes.paper}>
                <Box mb={2}>
                  <Typography mb={5}>
                    <BookIcon />
                    <b>
                      {' '}
                      LESSON LIST
                      {' '}
                    </b>
                    <BookIcon />
                  </Typography>
                </Box>
                <Divider />
                <Box mt={2}>
                  List of lessons...
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Container>
  )
}