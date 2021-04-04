import { useEffect, useState } from 'react'
import { status as authStatus, login, selectStatus } from 'redux/authSlice'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import StyledLink from 'components/StyledLink'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import Box from '@material-ui/core/Box'
import { CircularProgress } from '@material-ui/core'

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
  errors: {
    color: theme.palette.type === 'light' ? red[600] : red[700]
  },
  google: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: theme.palette.type === 'light' ? red[600] : red[700],
    '&:hover': {
      backgroundColor: theme.palette.type === 'light' ? red[800] : red[900]
    }
  },
  loading: {
    color: 'white',
    maxWidth: '1rem',
    maxHeight: '1rem',
    marginLeft: '0.5rem'
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}))

export default function LoginPage(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentAuthStatus = useSelector(selectStatus)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    props.updateTitle('Login')
  }, [])

  function handleEmailOnChange(event) {
    setEmail(event.target.value)
  }

  function handleLoginWithAuth0(e) {
    e.preventDefault()
    setLoading(true)
    dispatch(login(email, password))
  }

  function handleLoginWithGoogle() {
    window.location.replace('/auth/login/google-oauth2')
  }

  function handlePasswordOnChange(event) {
    setPassword(event.target.value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLoginWithAuth0}>
          <TextField
            autoComplete="email"
            autoFocus
            error={currentAuthStatus === authStatus.FAILURE}
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            onChange={handleEmailOnChange}
            required
            type="email"
            value={email}
            variant="outlined"
          />
          <TextField
            autoComplete="current-password"
            error={currentAuthStatus === authStatus.FAILURE}
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
          <Box
            className={classes.errors}
            display={
              currentAuthStatus === authStatus.FAILURE ? 'block' : 'none'
            }
          >
            <strong>Wrong email or password.</strong>
          </Box>
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            type="submit"
            variant="contained"
          >
            Sign In
            {loading && currentAuthStatus !== authStatus.FAILURE && (
              <CircularProgress className={classes.loading} />
            )}
          </Button>
          <Grid container>
            <Grid item sm>
              <StyledLink href="/register">
                Don&apos;t have an account? Sign Up
              </StyledLink>
            </Grid>
          </Grid>
          <Button
            className={classes.google}
            color="primary"
            fullWidth
            onClick={handleLoginWithGoogle}
            type="button"
            variant="contained"
          >
            Sign In with Google
          </Button>
        </form>
      </div>
    </Container>
  )
}
