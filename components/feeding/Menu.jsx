import { useState } from 'react'
import { selectFeeding, selectWeekIndex, updateWeek } from 'redux/feedingSlice'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Tab from '@material-ui/core/Tab'
import TabPanel from './TabPanel'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import formatMsTo24h from 'scripts/formatMsTo24h'
import { makeStyles } from '@material-ui/core/styles'

function a11yProps(index) {
  return {
    'aria-controls': `day-tabpanel-${index}`,
    id: `day-tab-${index}`
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    marginBottom: '8px',
    marginTop: '8px'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    marginBottom: '8px',
    marginTop: '8px'
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'gray'
      }
    },
    '& label.Mui-focused': {
      color: theme.palette.type === 'dark' && theme.palette.common.white
    },
    width: '100%'
  }
}))

export default function Menu() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const feed = useSelector(selectFeeding)
  const selectedWeekIndex = useSelector(selectWeekIndex)
  const [tabIndex, setTabIndex] = useState(0)

  function handleWeekChange(event) {
    dispatch(updateWeek(parseInt(event.target.value, 10)))
  }

  function handleTabChange(event, newValue) {
    setTabIndex(newValue)
  }

  return (
    <>
      <FormControl className={classes.formControl} component="fieldset">
        <RadioGroup
          aria-label="weeks"
          name="weeks"
          onChange={handleWeekChange}
          row
          value={selectedWeekIndex}
        >
          {feed?.weeks.map((week, index) => (
            <FormControlLabel
              control={<Radio color="primary" />}
              key={`week-${index}`}
              label={`Week ${index + 1}`}
              labelPlacement="start"
              value={index}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            aria-label="days"
            onChange={handleTabChange}
            scrollButtons="auto"
            value={tabIndex}
            variant="scrollable"
          >
            <Tab label="Monday" {...a11yProps(0)} />
            <Tab label="Tuesday" {...a11yProps(1)} />
            <Tab label="Wednesday" {...a11yProps(2)} />
            <Tab label="Thursday" {...a11yProps(3)} />
            <Tab label="Friday" {...a11yProps(4)} />
            <Tab label="Saturday" {...a11yProps(5)} />
            <Tab label="Sunday" {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        {feed?.weeks[selectedWeekIndex].days.map((day, index) => (
          <TabPanel index={index} key={`day-${index + 1}`} value={tabIndex}>
            <Box>
              <Typography gutterBottom variant="h6">
                <b>
                  {
                    /* prettier-ignore */
                    `Breakfast (${formatMsTo24h(day.meals[0].timeStart)} - ${formatMsTo24h(day.meals[0].timeEnd)})`
                  }
                </b>
              </Typography>
              {day.meals[0].menu}
            </Box>
            <Box mt={3}>
              <Typography gutterBottom variant="h6">
                <b>
                  {
                    /* prettier-ignore */
                    `Lunch (${formatMsTo24h(day.meals[1].timeStart)} - ${formatMsTo24h(day.meals[1].timeEnd)})`
                  }
                </b>
              </Typography>
              {day.meals[1].menu}
            </Box>
            <Box mt={3}>
              <Typography gutterBottom variant="h6">
                <b>
                  {
                    /* prettier-ignore */
                    `Dinner (${formatMsTo24h(day.meals[2].timeStart)} - ${formatMsTo24h(day.meals[2].timeEnd)})`
                  }
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
