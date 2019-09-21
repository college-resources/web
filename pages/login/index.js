/* global fetch */

import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import UserContext from '../../components/UserContext'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
    margin: theme.spacing(3, 0, 2)
  }
}))

const GoogleButton = withStyles({
  root: {
    backgroundColor: red[600],
    '&:hover': {
      backgroundColor: red[800]
    }
  }
})(Button)

export default function () {
  const classes = useStyles()
  const [email, setEmail] = React.useState('')
  const [passwd, setPasswd] = React.useState('')
  const { setUser } = React.useContext(UserContext)

  const loginOnClickHandler = () => {
    fetch('auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        passwd
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setUser(json)
        Router.push('/user')
      })
      .catch(err => console.log(err.message)) // TODO: Implement error handling
  }

  const loginWithGoogleOnClickHandler = () => {
    window.location.replace('/auth/login/google-oauth2')
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={passwd}
            onChange={e => setPasswd(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='button'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={loginOnClickHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#'>
                <a>Forgot password?</a>
              </Link>
            </Grid>
            <Grid item>
              <Link href={'/register'}>
                <a>Don't have an account? Sign Up</a>
              </Link>
            </Grid>
          </Grid>
          <GoogleButton
            type='button'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={loginWithGoogleOnClickHandler}
          >
            Sign In with Google
          </GoogleButton>
        </form>
      </div>
    </Container>
  )
}
