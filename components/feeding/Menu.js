import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import formatMsTo24HourClock from '../../scripts/formatMsTo24HourClock'

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
      <Box p={3}>{children}</Box>
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
    id: `day-tab-${index}`,
    'aria-controls': `day-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: '8px',
    marginBottom: '8px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    '& label.Mui-focused': {
      color: theme.palette.type === 'dark' && theme.palette.common.white
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'gray'
      }
    },
    width: '100%'
  },
  formControl: {
    marginTop: '8px',
    marginBottom: '8px'
  },
  dense: {
    marginTop: theme.spacing(2)
  }
}))

export default function (props) {
  const classes = useStyles()
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0)
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue)
  }

  return (
    <>
      <FormControl component='fieldset' className={classes.formControl}>
        <RadioGroup
          aria-label='weeks'
          name='weeks'
          value={selectedWeekIndex}
          onChange={event => setSelectedWeekIndex(parseInt(event.target.value))}
          row
        >
          {props.feed.weeks.map((week, index) => (
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
            value={selectedTabIndex}
            onChange={handleTabChange}
            aria-label='days'
            variant='scrollable'
            scrollButtons='auto'
          >
            <Tab label='Monday' {...a11yProps(0)} />
            <Tab label='Tuesday' {...a11yProps(1)} />
            <Tab label='Wednesday' {...a11yProps(2)} />
            <Tab label='Thursday' {...a11yProps(3)} />
            <Tab label='Friday' {...a11yProps(4)} />
            <Tab label='Saturday' {...a11yProps(5)} />
            <Tab label='Sunday' {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        {props.feed.weeks[selectedWeekIndex].days.map((day, index) => (
          <TabPanel value={selectedTabIndex} key={'day-' + (index + 1)} index={index}>
            <Box>
              <Typography variant='h6' gutterBottom>
                <b>
                  Breakfast
                  ({formatMsTo24HourClock(day.meals[0].timeStart)} - {formatMsTo24HourClock(day.meals[0].timeEnd)})
                </b>
              </Typography>
              {day.meals[0].menu}
            </Box>
            <Box mt={3}>
              <Typography variant='h6' gutterBottom>
                <b>
                  Lunch
                  ({formatMsTo24HourClock(day.meals[1].timeStart)} - {formatMsTo24HourClock(day.meals[1].timeEnd)})
                </b>
              </Typography>
              {day.meals[1].menu}
            </Box>
            <Box mt={3}>
              <Typography variant='h6' gutterBottom>
                <b>
                  Dinner
                  ({formatMsTo24HourClock(day.meals[2].timeStart)} - {formatMsTo24HourClock(day.meals[2].timeEnd)})
                </b>
              </Typography>
              {day.meals[2].menu}
            </Box>
          </TabPanel>
        ))}
      </div>
    </>
  )
}
