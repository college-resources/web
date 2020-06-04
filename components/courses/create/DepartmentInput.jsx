import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  menu: {
    width: 200
  }
})

export default function DepartmentInput (props) {
  const classes = useStyles()
  const { departments, onChange, value } = props

  return (
    <TextField
      SelectProps={{
        MenuProps: {
          className: classes.menu
        }
      }}
      fullWidth
      id="department-input"
      label="Department"
      margin="normal"
      onChange={onChange}
      required
      select
      value={value}
      variant="outlined"
    >
      {departments.map((department) => (
        <MenuItem
          key={department._id}
          value={department._id}
        >
          {department.name}
        </MenuItem>
      ))}
    </TextField>
  )
}
