import { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import UserContext from '../components/UserContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  avatar: {
    margin: 'auto',
    marginBottom: '1rem',
    width: '5rem',
    height: '5rem'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  }
}))

export default function (props) {
  const { user } = useContext(UserContext)
  const classes = useStyles()

  useEffect(() => {
    props.updateTitle('Profile')
  }, [])

  return (
    <Container>
      <Box mt={2}>
        <Grid
          container
          justify='center'
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Avatar alt='account picture' src={user.picture} className={classes.avatar} />
              <TextField
                label='First Name'
                defaultValue={user.given_name}
                InputProps={{
                  readOnly: true
                }}
                variant='outlined'
                fullWidth
                margin='normal'
              />
              <TextField
                label='Last Name'
                defaultValue={user.family_name}
                InputProps={{
                  readOnly: true
                }}
                variant='outlined'
                fullWidth
                margin='normal'
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Box fontSize='h6.fontSize' fontWeight='fontWeightMedium'>Email Address</Box>
              <TextField
                defaultValue={user.email}
                margin='normal'
                InputProps={{
                  readOnly: true
                }}
                variant='outlined'
                fullWidth
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        {JSON.stringify(user)}
      </Box>
    </Container>
  )
}
