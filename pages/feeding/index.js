import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import gql from '../../scripts/graphql'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={7}>{children}</Box>
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const feedingHandler = () => Promise.resolve(
  gql(`
      query {
   feeding {
    weeks {
      days {
        meals {
          time
          menu
        }
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
  const [value, setValue] = React.useState(0)

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

  const handleChange2 = (event, newValue) => {
    setValue(newValue)
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
      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs value={value} onChange={handleChange2} aria-label='simple tabs example' variant='scrollable' scrollButtons='on'>
            <Tab label='Day One' {...a11yProps(0)} />
            <Tab label='Day Two' {...a11yProps(1)} />
            <Tab label='Day Three' {...a11yProps(2)} />
            <Tab label='Day Four' {...a11yProps(3)} />
            <Tab label='Day Five' {...a11yProps(4)} />
            <Tab label='Day Six' {...a11yProps(5)} />
            <Tab label='Day Seven' {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </div>
    </Container>
  )
}
