import { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import StyledLink from 'components/StyledLink'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { register } from 'redux/authSlice'
import { useDispatch } from 'react-redux'

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
    marginTop: theme.spacing(3),
    // Fix IE 11 issue
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

export default function RegisterPage (props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [
    email,
    setEmail
  ] = useState('')
  const [
    familyName,
    setFamilyName
  ] = useState('')
  const [
    givenName,
    setGivenName
  ] = useState('')
  const [
    password,
    setPassword
  ] = useState('')

  useEffect(
    () => {
      props.updateTitle('Register')
    }
  )

  function handleEmailOnChange (event) {
    setEmail(event.target.value)
  }

  function handleFamilyNameOnChange (event) {
    setFamilyName(event.target.value)
  }

  function handleGivenNameOnChange (event) {
    setGivenName(event.target.value)
  }

  function handlePasswordOnChange (event) {
    setPassword(event.target.value)
  }

  function handleRegister () {
    dispatch(register(
      email,
      givenName,
      familyName,
      password
    ))
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
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              sm={6}
              xs={12}
            >
              <TextField
                autoComplete="given-name"
                autoFocus
                fullWidth
                id="firstName"
                label="First Name"
                name="fname"
                onChange={handleGivenNameOnChange}
                required
                value={givenName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <TextField
                autoComplete="family-name"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lname"
                onChange={handleFamilyNameOnChange}
                required
                value={familyName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                autoComplete="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleEmailOnChange}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                autoComplete="new-password"
                fullWidth
                id="password"
                label="Password"
                name="password"
                onChange={handlePasswordOnChange}
                required
                type="password"
                value={password}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            onClick={handleRegister}
            type="button"
            variant="contained"
          >
            Sign Up
          </Button>
          <Grid
            container
            justify="flex-end"
          >
            <Grid item>
              <StyledLink href="/login">
                Already have an account? Sign in
              </StyledLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
