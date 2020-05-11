import React, { useEffect, useState } from 'react'
import BookIcon from '@material-ui/icons/Book'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import { Typography } from '@material-ui/core'
import formatMsTo24HourClock from '../scripts/formatMsTo24HourClock'
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
const useStyles = makeStyles((theme) => ({
  green: {
    color: green['600']
  },
  lesson: {
    '& hr': {
      margin: theme.spacing(
        0,
        0.5
      )
    },
    '& svg': {
      margin: theme.spacing(1.5)
    },
    backgroundColor: '#40444b',
    borderRadius: theme.shape.borderRadius
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
                                    ? `Open until ${formatMsTo24HourClock(meals[currentWeekIndex].lastMeal.timeEnd)}`
                                    : 'Closed'
                                }
                              </b>
                            </span>
                            {' - '}
                            Next meal
                            {' '}
                            <b>
                              {formatMsTo24HourClock(meals[currentWeekIndex].nextMeal.timeStart)}
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
                <Box
                  alignItems="center"
                  css={{ height: 20 }}
                  display="flex"
                  justifyContent="center"
                  mb={2.5}
                  mt={0.5}
                >
                  <BookIcon />
                  <Box mx={1}>
                    <Typography variant="h6">
                      COURSES
                    </Typography>
                  </Box>
                  <BookIcon />
                </Box>
                <Divider />
                <Box mt={2}>
                  <Box mb={0.5}>
                    <Grid
                      alignItems="center"
                      className={classes.lesson}
                      container
                    >
                      <Box p={2}>
                        <Typography>
                          1
                        </Typography>
                      </Box>
                      <Divider
                        flexItem
                        orientation="vertical"
                      />
                      <Box ml={1}>
                        <Typography>
                          [PH] Lesson 1
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                  <Box mb={0.5}>
                    <Grid
                      alignItems="center"
                      className={classes.lesson}
                      container
                    >
                      <Box p={2}>
                        <Typography>
                          2
                        </Typography>
                      </Box>
                      <Divider
                        flexItem
                        orientation="vertical"
                      />
                      <Box ml={1}>
                        <Typography>
                          [PH] Lesson 2
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                  <Box mb={0.5}>
                    <Grid
                      alignItems="center"
                      className={classes.lesson}
                      container
                    >
                      <Box p={2}>
                        <Typography>
                          2
                        </Typography>
                      </Box>
                      <Divider
                        flexItem
                        orientation="vertical"
                      />
                      <Box ml={1}>
                        <Typography>
                          [PH] Lesson 3
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Container>
  )
}
