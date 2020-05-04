import { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import StyledLink from '../../components/StyledLink'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import UserContext from '../../components/UserContext'
import { register } from '../../scripts/auth'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.type === 'dark' && theme.palette.text.permanentLight
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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

export default function SignUp () {
  const classes = useStyles()
  const [givenName, setGivenName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext)

  const signUpOnClickHandler = () => {
    register(setUser, email, givenName, familyName, password)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='fname'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                value={givenName}
                onChange={e => setGivenName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lname'
                autoComplete='family-name'
                value={familyName}
                onChange={e => setFamilyName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type='button'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={signUpOnClickHandler}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <StyledLink href='/login'>
                Already have an account? Sign in
              </StyledLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
