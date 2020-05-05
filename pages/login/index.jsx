import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, withTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import StyledLink from '../../components/StyledLink'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import UserContext from '../../components/UserContext'
import { login } from '../../scripts/auth'
import { red } from '@material-ui/core/colors'
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.type === 'dark' && theme.palette.text.permanentLight,
    margin: theme.spacing(2)
  },
  form: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.text.permanentLight
      }
    },
    '& label.Mui-focused': {
      color: theme.palette.type === 'dark' && theme.palette.common.white
    },
    marginTop: theme.spacing(1),
    // Fixes IE 11 issue
    width: '100%'
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  submit: {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing(
      3,
      0,
      2
    )
  }
}))

const GoogleButton = withTheme(styled(Button)`
  background-color: ${(props) => (props.theme.palette.type === 'light'
  ? red[600]
  : red[700])};
  &:hover {
    background-color: ${(props) => (props.theme.palette.type === 'light'
  ? red[800]
  : red[900])};
  }
`)

export default function LoginPage (props) {
  const classes = useStyles()
  const [
    email,
    setEmail
  ] = useState('')
  const [
    password,
    setPassword
  ] = useState('')
  const { setUser } = useContext(UserContext)

  useEffect(
    () => {
      props.updateTitle('Login')
    },
    []
  )

  function handleEmailOnChange (event) {
    setEmail(event.target.value)
  }

  function handleLoginWithAuth0 () {
    login(
      setUser,
      email,
      password
    )
  }

  function handleLoginWithGoogle () {
    window.location.replace('/auth/login/google-oauth2')
  }

  function handlePasswordOnChange (event) {
    setPassword(event.target.value)
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
        >
          <TextField
            autoComplete="email"
            autoFocus
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            onChange={handleEmailOnChange}
            required
            value={email}
            variant="outlined"
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={handlePasswordOnChange}
            required
            type="password"
            value={password}
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value="remember"
              />
            }
            label="Remember me"
          />
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            onClick={handleLoginWithAuth0}
            type="button"
            variant="contained"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <StyledLink href="#">
                Forgot password?
              </StyledLink>
            </Grid>
            <Grid item>
              <StyledLink href="/register">
                Don&apos;t have an account? Sign Up
              </StyledLink>
            </Grid>
          </Grid>
          <GoogleButton
            className={classes.submit}
            color="primary"
            fullWidth
            onClick={handleLoginWithGoogle}
            type="button"
            variant="contained"
          >
            Sign In with Google
          </GoogleButton>
        </form>
      </div>
    </Container>
  )
}
