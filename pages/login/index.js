import { useContext, useEffect, useState } from 'react'
import StyledLink from '../../components/StyledLink'
import styled from 'styled-components'
import { makeStyles, withTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import UserContext from '../../components/UserContext'
import { red } from '@material-ui/core/colors'
import { login } from '../../scripts/auth'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.type === 'dark' && theme.palette.text.permanentLight
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    '& label.Mui-focused': {
      color: theme.palette.type === 'dark' && theme.palette.common.white
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.text.permanentLight
      }
    }
  },
  submit: {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
    margin: theme.spacing(3, 0, 2)
  }
}))

const GoogleButton = withTheme(styled(Button)`
  background-color: ${props => props.theme.palette.type === 'light' ? red[600] : red[700]};
  &:hover {
    background-color: ${props => props.theme.palette.type === 'light' ? red[800] : red[900]};
  }
`)

export default function (props) {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    props.updateTitle('Login')
  }, [])

  const loginOnClickHandler = () => {
    login(setUser, email, passwd)
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
              <StyledLink href='#'>
                  Forgot password?
              </StyledLink>
            </Grid>
            <Grid item>
              <StyledLink href='/register'>
                Don't have an account? Sign Up
              </StyledLink>
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
