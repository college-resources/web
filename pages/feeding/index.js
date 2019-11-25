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
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

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

function formatMs (ms) {
  const [time] = new Date(ms).toUTCString().match(/(\d\d):(\d\d)/)
  return time
}

export default function Index (props) {
  const classes = useStyles()
  const [feedings, setFeedings] = useState([])
  const [selectedFeedingIndex, setSelectedFeedingIndex] = useState(-1)
  const [value, setValue] = useState(0)
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0)

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
      <FormControl component='fieldset'>
        <RadioGroup
          aria-label='position'
          name='position'
          value={selectedWeekIndex}
          onChange={event => setSelectedWeekIndex(parseInt(event.target.value))}
          row
        >
          {(selectedFeedingIndex !== -1) && feedings[selectedFeedingIndex].weeks.map((week, index) => (
            <FormControlLabel
              key={'week-' + index}
              value={index}
              control={<Radio color='primary' />}
              label={'Week ' + (index + 1)}
              labelPlacement='start'
            />
          ))}
        </RadioGroup>
      </FormControl>
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
        {(selectedFeedingIndex !== -1) && feedings[selectedFeedingIndex].weeks[selectedWeekIndex].days.map((day, index) => (
          <TabPanel value={value} key={index} index={index}>
            <div>
              <b>Breakfast</b>
              <p>
                  Consists of: {day.meals[0].menu}<br />
                  Time: {formatMs(day.meals[0].timeStart)} - {formatMs(day.meals[0].timeEnd)}
              </p>
            </div>
            <div>
              <b>Lunch</b>
              <p>
                  Consists of: {day.meals[1].menu}<br />
                  Time: {formatMs(day.meals[1].timeStart)} - {formatMs(day.meals[1].timeEnd)}
              </p>
            </div>
            <div>
              <b>Dinner</b>
              <p>
                  Consists of: {day.meals[2].menu}<br />
                  Time: {formatMs(day.meals[2].timeStart)} - {formatMs(day.meals[2].timeEnd)}
              </p>
            </div>
          </TabPanel>
        ))}
      </div>
    </Container>
  )
}
