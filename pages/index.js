import React, { useEffect } from 'react'
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

  useEffect(() => {
    props.updateTitle('Home')
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
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                  alignItems='flex-start'
                >
                  <p>Currently: <span className={classes.red}><b>Closed</b></span></p>
                  <Divider orientation='vertical' />
                  <p>Next meal: <b>12:00</b></p>
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                  alignItems='flex-start'
                >
                  <p>Currently: <span className={classes.green}><b>Open</b></span></p>
                  <Divider orientation='vertical' />
                  <p>Closes at: <b>16:30</b></p>
                </Grid>
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
