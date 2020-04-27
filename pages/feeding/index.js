import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import PropTypes from 'prop-types'
import formatMsTo24HourClock from '../../scripts/formatMsTo24HourClock'
import gql from '../../scripts/graphql'

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

export default function Index (props) {
  const classes = useStyles()
  const [feedings, setFeedings] = useState([])
  const [selectedFeedingIndex, setSelectedFeedingIndex] = useState('')
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0)

  useEffect(() => {
    props.updateTitle('Feeding')
    feedingHandler().then(gqlFeeding => {
      if (gqlFeeding) {
        setFeedings(gqlFeeding)
      }
    })
  }, [])

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue)
  }

  return (
    <Container>
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          id='restaurant'
          select
          className={classes.textField}
          label='Restaurant'
          value={selectedFeedingIndex}
          onChange={event => { setSelectedFeedingIndex(event.target.value); setSelectedWeekIndex(0) }}
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
      <FormControl component='fieldset' className={classes.formControl}>
        <RadioGroup
          aria-label='weeks'
          name='weeks'
          value={selectedWeekIndex}
          onChange={event => setSelectedWeekIndex(parseInt(event.target.value))}
          row
        >
          {(selectedFeedingIndex !== '') && feedings[selectedFeedingIndex].weeks.map((week, index) => (
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
        {(selectedFeedingIndex !== '') && feedings[selectedFeedingIndex].weeks[selectedWeekIndex].days.map((day, index) => (
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
    </Container>
  )
}
