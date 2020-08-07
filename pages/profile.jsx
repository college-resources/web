import React, { useContext, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { selectUser } from 'redux/authSlice'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: '5rem',
    margin: 'auto',
    marginBottom: '1rem',
    width: '5rem'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  root: {
    flexGrow: 1
  }
}))

export default function ProfilePage (props) {
  const user = useSelector(selectUser)
  const classes = useStyles()

  useEffect(
    () => {
      props.updateTitle('Profile')
    },
    []
  )

  return (
    <Container>
      <Box mt={2}>
        <Grid
          container
          justify="center"
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <Paper className={classes.paper}>
              <Avatar
                alt="account picture"
                className={classes.avatar}
                src={user.picture}
              />
              <TextField
                InputProps={{
                  readOnly: true
                }}
                defaultValue={user.given_name}
                fullWidth
                label="First Name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                InputProps={{
                  readOnly: true
                }}
                defaultValue={user.family_name}
                fullWidth
                label="Last Name"
                margin="normal"
                variant="outlined"
              />
            </Paper>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Paper className={classes.paper}>
              <Box
                fontSize="h6.fontSize"
                fontWeight="fontWeightMedium"
              >
                Email Address
              </Box>
              <TextField
                InputProps={{
                  readOnly: true
                }}
                defaultValue={user.email}
                fullWidth
                margin="normal"
                variant="outlined"
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
