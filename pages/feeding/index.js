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
            timeStart
            timeEnd
            menu
          }
        }
      }
      startsFrom
      name
      _id
    }
  }
    `).then(data => data.feeding)
)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
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
  const [feedings, setFeedings] = useState([])
  const [selectedFeedingIndex, setSelectedFeedingIndex] = useState(undefined)
  const [value, setValue] = React.useState(0)

  useEffect(() => {
    props.updateTitle('Feeding')
    feedingHandler().then(gqlFeeding => {
      if (gqlFeeding) {
        setFeedings(gqlFeeding)
      }
    })
  }, [])

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
          value={selectedFeedingIndex}
          onChange={event => setSelectedFeedingIndex(event.target.value)}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin='normal'
          variant='outlined'
        >
          {feedings.map((feed, index) => (
            <MenuItem key={feed._id} value={index}>
              {feed.name}
            </MenuItem>
          ))}
        </TextField>
      </form>
      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange2}
            aria-label='simple tabs example'
            variant='scrollable'
            scrollButtons='auto'
          >
            <Tab label='Day One' {...a11yProps(0)} />
            <Tab label='Day Two' {...a11yProps(1)} />
            <Tab label='Day Three' {...a11yProps(2)} />
            <Tab label='Day Four' {...a11yProps(3)} />
            <Tab label='Day Five' {...a11yProps(4)} />
            <Tab label='Day Six' {...a11yProps(5)} />
            <Tab label='Day Seven' {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        {(selectedFeedingIndex !== undefined) && feedings[selectedFeedingIndex].weeks.map(week => (
          week.days.map((day, index) => (
            <TabPanel value={value} key={index} index={index}>
              <div>
                <b>Breakfast</b><br />
          Consists of: {day.meals[0].menu}<br />
          From: {day.meals[0].timeStart}<br />
          To: {day.meals[0].timeEnd}<br />
              </div><br />
              <div>
                <b>Lunch</b><br />
            Consists of: {day.meals[1].menu}<br />
            From: {day.meals[1].timeStart}<br />
            To: {day.meals[1].timeEnd}<br />
              </div><br />
              <div>
                <b>Dinner</b><br />
            Consists of: {day.meals[2].menu}<br />
            From: {day.meals[2].timeStart}<br />
            To: {day.meals[2].timeEnd}<br />
              </div>
            </TabPanel>
          ))
        ))}
      </div>
    </Container>
  )
}
