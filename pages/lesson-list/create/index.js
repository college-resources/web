import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'

const departments = [
  {
    value: 'IT',
    label: 'Information Technology'
  },
  {
    value: 'EL',
    label: 'Electronics Engineering'
  }
]

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}))

export default function Index (props) {
  const classes = useStyles()
  const [values, setValues] = React.useState({
    name: '',
    department: '',
    semester: 1
  })

  useEffect(() => {
    props.updateTitle('Create lesson')
  }, [])

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const semesterValidator = event => {
    const semester = event.target.value
    handleChange('semester')(event)

    if (semester < 1) {
      setValues({ ...values, [semester]: 1 })
    } else if (semester > 10) {
      setValues({ ...values, [semester]: 10 })
    }
  }

  return (
    <Container>
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          required
          id='lesson-name'
          label='Lesson Name'
          margin='normal'
          variant='outlined'
          fullWidth
        />
        <TextField
          required
          select
          id='lesson-dept'
          label='Department'
          value={values.department}
          onChange={handleChange('department')}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin='normal'
          variant='outlined'
          fullWidth
        >
          {departments.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id='lesson-semester'
          label='Semester'
          onChange={e => semesterValidator(e)}
          type='number'
          value={values.semester}
          InputLabelProps={{
            shrink: true
          }}
          margin='normal'
          variant='outlined'
          fullWidth
        />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              type='submit'
              className={classes.dense}
              variant='contained'
              color='primary'
              fullWidth
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type='button'
              className={classes.dense}
              variant='contained'
              color='secondary'
              fullWidth
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
