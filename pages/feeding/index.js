import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import gql from '../../scripts/graphql'
import MenuItem from '@material-ui/core/MenuItem'

const feedingHandler = () => Promise.resolve(
  gql(`
      query {
        feeding {
          _id
          days {
            meals {
              time
              menu
            }
          }
        }
      }
    `).then(data => data.feeding)
)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%'
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: '100%'
  }
}))

export default function Index (props) {
  const classes = useStyles()
  const [feeding, setFeeding] = useState([])
  const [values, setValues] = useState({
    selectedFeedingId: ''
  })

  useEffect(() => {
    props.updateTitle('Feeding')
    feedingHandler().then(gqlFeeding => {
      if (gqlFeeding) {
        setFeeding(gqlFeeding)
      }
    })
  }, [])

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <Container>
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          id='feeding'
          select
          className={classes.textField}
          label='Feeding'
          value={values.selectedFeedingId}
          onChange={handleChange('selectedFeedingId')}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin='normal'
          variant='outlined'
        >
          {feeding.map(feed => (
            <MenuItem key={feed._id} value={feed._id}>
              {feed._id}
            </MenuItem>
          ))}
        </TextField>
      </form>
    </Container>
  )
}
