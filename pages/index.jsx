import { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CoursesModule from 'components/home/CoursesModule'
import FeedingModule from 'components/home/FeedingModule'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  lesson: {
    '& hr': {
      margin: theme.spacing(0, 0.5)
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
  root: {
    flexGrow: 1
  }
}))

export default function Homepage(props) {
  const classes = useStyles()

  useEffect(() => {
    props.updateTitle('Home')
  },
    []
  )

  return (
    <Container>
      <Box mt={2}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FeedingModule />
            </Grid>
            <Grid item md={6} xs={12}>
              <CoursesModule />
            </Grid>
          </Grid>
        </div>
      </Box>
    </Container>
  )
}
