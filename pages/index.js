import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import BookIcon from '@material-ui/icons/Book'
import { green } from '@material-ui/core/colors'
import gql from '../scripts/graphql'

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

const findLastAndNextMeal = feeding => {
  const currentDayInWeeks = feeding.weeks.map(week => week.days[(new Date().getDay() + 6) % 7])
  return currentDayInWeeks.map(day => {
    let isLastOpen = false
    let lastMeal
    let nextMeal

    const currentTimeMs = (Date.now() + new Date().getTimezoneOffset() * 60 * 1000) % (24 * 3600 * 1000)

    day.meals.forEach(meal => {
      if (meal.timeStart < currentTimeMs) {
        lastMeal = meal
        if (meal.timeEnd > currentTimeMs) {
          isLastOpen = true
        }
      }

      if (meal.timeStart > currentTimeMs && !currentTimeMs) {
        nextMeal = meal
      }
    })

    if (!nextMeal) {
      nextMeal = day.meals[0]
    }

    return { isLastOpen, lastMeal, nextMeal }
  })
}

const formatMs = ms => {
  const [time] = new Date(ms).toUTCString().match(/(\d\d):(\d\d)/)
  return time
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  red: {
    color: theme.palette.error.main
  },
  green: {
    color: green['600']
  }
}))

export default function (props) {
  const classes = useStyles()
  const [feedings, setFeedings] = useState([])

  useEffect(() => {
    props.updateTitle('Home')
    feedingHandler().then(gqlFeeding => {
      if (gqlFeeding) {
        setFeedings(gqlFeeding)
      }
    })
  }, [])

  return (
    <Container>
      <Box mt={2}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Box mb={2}>
                  <Typography mb={5}><RestaurantIcon /><b> FEEDING </b><RestaurantIcon /></Typography>
                </Box>
                <Divider />
                {feedings.map(feed => {
                  const meals = findLastAndNextMeal(feed)

                  return (
                    <Grid
                      container
                      direction='row'
                      justify='space-between'
                      alignItems='flex-start'
                      key={feed._id}
                    >
                      <p><b> {feed.name} </b></p>
                      <Divider />
                      {feed.weeks.map((week, index) => (
                        <Grid
                          container
                          direction='row'
                          justify='space-between'
                          alignItems='flex-start'
                          key={'week-' + index}
                        >
                          <p>{'Week ' + (index + 1)}</p>
                          <Divider orientation='vertical' />
                          <p>
                            <span
                              className={
                                meals[index].isLastOpen
                                  ? classes.green
                                  : classes.red
                              }
                            >
                              <b>
                                {meals[index].isLastOpen ? `Open until ${formatMs(meals[index].lastMeal.timeEnd)}` : 'Closed'}
                              </b>
                            </span>
                          </p>
                          <Divider orientation='vertical' />
                          <p>Next meal: <b>{formatMs(meals[index].nextMeal.timeStart)}</b></p>
                        </Grid>
                      ))}
                      <Divider orientation='horizontal' />
                    </Grid>
                  )
                })}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Box mb={2}>
                  <Typography mb={5}><BookIcon /><b> LESSON LIST </b><BookIcon /></Typography>
                </Box>
                <Divider />
                <br />
                List of lessons...
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Container>
  )
}
