import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { dynamicSortMultiple } from '../../scripts/sorting'
import gql from '../../scripts/graphql'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const lessonHandler = () => Promise.resolve(gql(`
  query {
    lessons {
      _id
      lessonCode
      name
      semester
      type
      hoursTheory
      hoursLab
      credit
      department {
        name
      }
    }
  }
`).then((data) => data.lessons && data.lessons.sort(dynamicSortMultiple(
  'semester',
  'lessonCode'
))))

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(160),
      height: theme.spacing(80)
    }
  }
}))

export default function CoursesPage (props) {
  const [
    lessons,
    setLessons,
  ] = useState([])
  const options = ['Option 1', 'Option 2']
  const [value, setValue] = React.useState(options[0])
  const [inputValue, setInputValue] = React.useState('')
  const classes = useStyles()
  useEffect(
    () => {
      props.updateTitle('Notes')
      lessonHandler().then((gqlLessons) => {
        if (gqlLessons) {
          setLessons(gqlLessons)
        }
      })
    },
    []
  )
  return (
    <Container>
      <Autocomplete
        getOptionLabel={(option) => option.name}
        id='combo-box-demo'
        options={options}
        renderInput={(params) => (<TextField
          {...params}
          fullwidth
          label='Combo box'
          variant='outlined'
          value={value}
          onChange={(event, newValue) => { setValue(newValue) }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => { setInputValue(newInputValue) }} />
        )}

      />
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <div className={classes.root}>
        <Paper variant='outlined' />
      </div>
    </Container>
  )
}
