import BookIcon from '@material-ui/icons/Book'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  lesson: {
    backgroundColor: theme.palette.type === 'light'
      ? '#fff'
      : '#40444b',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.normal
  },
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  }
}))

export default function CoursesModule () {
  const classes = useStyles()

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
        <Box mb={1}>
          <Paper>
            <Grid
              alignItems="center"
              className={classes.lesson}
              container
              wrap="nowrap"
            >
              <Grid item>
                <Box p={2}>
                  <Typography>
                    1
                  </Typography>
                </Box>
              </Grid>
              <Divider
                flexItem
                orientation="vertical"
              />
              <Grid item>
                <Box p={2}>
                  <Typography>
                    [PH] Lesson 1
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box mb={1}>
          <Paper>
            <Grid
              alignItems="center"
              className={classes.lesson}
              container
              wrap="nowrap"
            >
              <Grid item>
                <Box p={2}>
                  <Typography>
                    2
                  </Typography>
                </Box>
              </Grid>
              <Divider
                flexItem
                orientation="vertical"
              />
              <Grid item>
                <Box p={2}>
                  <Typography>
                    [PH] Lesson 2
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box mb={0.5}>
          <Paper>
            <Grid
              alignItems="center"
              className={classes.lesson}
              container
              wrap="nowrap"
            >
              <Grid item>
                <Box p={2}>
                  <Typography>
                    2
                  </Typography>
                </Box>
              </Grid>
              <Divider
                flexItem
                orientation="vertical"
              />
              <Grid item>
                <Box p={2}>
                  <Typography>
                    [PH] Lesson 3
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Paper>
  )
}
