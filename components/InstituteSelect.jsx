import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  getInstitutes,
  selectInstituteIndex,
  selectInstitutes,
  updateInstituteIndex
} from 'redux/instituteSlice'
import { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles((theme) => ({
  textField: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0
    },
    flexGrow: 1,
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'gray'
      }
    },
    '& label.Mui-focused': {
      color: theme.palette.type === 'dark' && theme.palette.common.white
    }
  }
}))

export default function InstituteSelect() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const institutes = useSelector(selectInstitutes)
  const selectedInstituteIndex = useSelector(selectInstituteIndex)

  useEffect(() => {
    dispatch(getInstitutes())
  }, [])

  function handleInstituteChange(event) {
    dispatch(updateInstituteIndex(event.target.value))
  }

  return (
    <Box display="flex">
      <TextField
        className={classes.textField}
        id="institute"
        label="Institute"
        margin="normal"
        onChange={handleInstituteChange}
        select
        value={selectedInstituteIndex >= 0 ? selectedInstituteIndex : ''}
        variant="outlined"
      >
        {institutes.map((institute, index) => (
          <MenuItem key={institute._id} value={index}>
            <Hidden xsDown>
              <b>{institute.acronym}</b>&nbsp;-&nbsp;{institute.name}
            </Hidden>
            <Hidden smUp>
              <b>{institute.acronym}</b>
              &nbsp;
              <span style={{ fontSize: '0.8rem' }}>{institute.name}</span>
            </Hidden>
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
