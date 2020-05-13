import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import MinusIcon from '@material-ui/icons/Remove'
import PlusIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'
import { dynamicSort } from 'scripts/sorting'
import gql from 'scripts/graphql'
import { makeStyles } from '@material-ui/core/styles'

const departmentHandler = () => Promise.resolve(gql(`
  query {
    departments {
      _id
      name
    }
  }
`).then((data) => data.departments.sort(dynamicSort('name'))))

const useStyles = makeStyles((theme) => ({
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

export default function CreatePage (props) {
  const classes = useStyles()
  const [
    departments,
    setDepartments
  ] = useState([])
  const [
    values,
    setValues
  ] = useState({
    department: '',
    name: '',
    semester: 1
  })

  useEffect(
    () => {
      props.updateTitle('Create lesson')
      departmentHandler().then((gqlDepartments) => {
        if (gqlDepartments) {
          setDepartments(gqlDepartments)
        }
      })
    },
    []
  )

  const lessonHandler = () => {
    gql(`
      mutation {
        addLesson(
          lesson: {
            name: "${values.name}",
            department: "${values.department}",
            semester: ${values.semester}
          }
        ) {
          _id
        }
      }
    `)
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  function handleClear () {
    setValues({
      ...values,
      department: '',
      name: '',
      semester: 1
    })
  }

  function handleSave () {
    lessonHandler()
    handleClear()
  }

  const handleSemesterChange = (num) => () => {
    const newValue = values.semester + num

    if (newValue < 1) {
      setValues({ ...values, semester: 1 })
    } else if (newValue > 10) {
      setValues({ ...values, semester: 10 })
    } else {
      setValues({ ...values, semester: newValue })
    }
  }

  function semesterValidator (event) {
    const semester = event.target.value
    handleChange('semester')(event)

    if (semester < 1) {
      setValues({ ...values, semester: 1 })
    } else if (semester > 10) {
      setValues({ ...values, semester: 10 })
    }
  }

  return (
    <Container>
      <form
        autoComplete="off"
        className={classes.container}
        noValidate
      >
        <TextField
          fullWidth
          id="lesson-name"
          label="Lesson Name"
          margin="normal"
          onChange={handleChange('name')}
          required
          value={values.name}
          variant="outlined"
        />
        <TextField
          fullWidth
          id="lesson-dept"
          label="Department"
          margin="normal"
          onChange={handleChange('department')}
          required
          select
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          value={values.department}
          variant="outlined"
        >
          {departments.map((dept) => (
            <MenuItem
              key={dept._id}
              value={dept._id}
            >
              {dept.name}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ width: '100%' }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <TextField
                fullWidth
                id="lesson-semester"
                InputLabelProps={{
                  shrink: true
                }}
                label="Semester"
                margin="normal"
                onChange={semesterValidator}
                required
                type="number"
                value={values.semester}
                variant="outlined"
              />
            </Box>
            <Box
              ml={1}
              my="auto"
            >
              <Fab
                aria-label="decrement semester"
                color="secondary"
                onClick={handleSemesterChange(-1)}
              >
                <MinusIcon />
              </Fab>
            </Box>
            <Box
              ml={1}
              my="auto"
            >
              <Fab
                aria-label="increment semester"
                color="primary"
                onClick={handleSemesterChange(1)}
              >
                <PlusIcon />
              </Fab>
            </Box>
          </Box>
        </div>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={6}
          >
            <Button
              className={classes.dense}
              color="primary"
              fullWidth
              onClick={handleSave}
              type="button"
              variant="contained"
            >
              Save
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Button
              className={classes.dense}
              color="secondary"
              fullWidth
              onClick={handleClear}
              type="button"
              variant="contained"
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
