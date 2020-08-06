import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import CodeInput from 'components/courses/create/CodeInput'
import Container from '@material-ui/core/Container'
import CreditInput from 'components/courses/create/CreditInput'
import DepartmentInput from 'components/courses/create/DepartmentInput'
import Grid from '@material-ui/core/Grid'
import HoursLabInput from 'components/courses/create/HoursLabInput'
import HoursLectureInput from 'components/courses/create/HoursLectureInput'
import NameInput from 'components/courses/create/NameInput'
import SemesterInput from 'components/courses/create/SemesterInput'
import TypeInput from '../../../components/courses/create/TypeInput'
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

function formDefaults () {
  return {
    name: '',
    department: '',
    semester: 1,
    code: '',
    lectureHours: 0,
    labHours: 0,
    credit: 0,
    type: ''
  }
}

export default function CreatePage (props) {
  const classes = useStyles()
  const [
    departments,
    setDepartments
  ] = useState([])
  const [
    values,
    setValues
  ] = useState(formDefaults())

  useEffect(
    () => {
      props.updateTitle('Create course')
      departmentHandler().then((gqlDepartments) => {
        if (gqlDepartments) {
          setDepartments(gqlDepartments)
        }
      })
    },
    []
  )

  const lessonHandler = () => {
    const query = `
      mutation (
        $name: String!,
        $department: ID!,
        $semester: Int!,
        $code: String!,
        $lectureHours: Int!,
        $labHours: Int!,
        $credit: Int!,
        $type: String!
      ) {
        addLesson(
          lesson: {
            name: $name,
            department: $department,
            semester: $semester,
            lessonCode: $code,
            hoursTheory: $lectureHours,
            hoursLab: $labHours,
            credit: $credit,
            type: $type
          }
        ) {
          _id
        }
      }
    `

    gql(
      query,
      values
    )
  }

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target
        ? event.target.value
        : event
    })
  }

  function handleClear () {
    setValues(formDefaults())
  }

  function handleSave () {
    lessonHandler()
    handleClear()
  }

  return (
    <Container>
      <form
        autoComplete="off"
        className={classes.container}
        noValidate
      >
        <NameInput
          onChange={handleChange('name')}
          value={values.name}
        />
        <DepartmentInput
          departments={departments}
          onChange={handleChange('department')}
          value={values.department}
        />
        <SemesterInput
          onChange={handleChange('semester')}
          setValues={setValues}
          value={values.semester}
        />
        <CodeInput
          onChange={handleChange('code')}
          value={values.code}
        />
        <HoursLectureInput
          onChange={handleChange('lectureHours')}
          value={values.lectureHours}
        />
        <HoursLabInput
          onChange={handleChange('labHours')}
          value={values.labHours}
        />
        <CreditInput
          onChange={handleChange('credit')}
          value={values.credit}
        />
        <TypeInput
          onChange={handleChange('type')}
          value={values.type}
        />
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
