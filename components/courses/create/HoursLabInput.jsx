import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import MinusIcon from '@material-ui/icons/Remove'
import PlusIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'

export default function HoursLabInput(props) {
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
            id="hours-lab-input"
            label="Lab hours"
            margin="normal"
            type="number"
            value={value}
            variant="outlined"
          />
        </Box>
        <Box ml={1} my="auto">
          <Fab
            aria-label="decrement lab hours"
            color="secondary"
            onClick={handleChange(-1)}
          >
            <MinusIcon />
          </Fab>
        </Box>
        <Box ml={1} my="auto">
          <Fab
            aria-label="increment lab hours"
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
