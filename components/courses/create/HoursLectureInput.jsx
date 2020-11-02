import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import MinusIcon from '@material-ui/icons/Remove'
import PlusIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'

export default function HoursLectureInput(props) {
  const { onChange, value } = props

  const handleChange = (num) => () => {
    const newValue = value + num
    onChange(newValue)
  }

  return (
    <div style={{ width: '100%' }}>
      <Box display="flex">
        <Box flexGrow={1}>
          <TextField
            InputProps={{
              readOnly: true
            }}
            fullWidth
            id="hours-lecture-input"
            label="Lecture hours"
            margin="normal"
            type="number"
            value={value}
            variant="outlined"
          />
        </Box>
        <Box ml={1} my="auto">
          <Fab
            aria-label="decrement lecture hours"
            color="secondary"
            onClick={handleChange(-1)}
          >
            <MinusIcon />
          </Fab>
        </Box>
        <Box ml={1} my="auto">
          <Fab
            aria-label="increment lecture hours"
            color="primary"
            onClick={handleChange(1)}
          >
            <PlusIcon />
          </Fab>
        </Box>
      </Box>
    </div>
  )
}
