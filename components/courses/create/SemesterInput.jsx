import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import MinusIcon from '@material-ui/icons/Remove'
import PlusIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'

export default function SemesterInput(props) {
  const { onChange, value } = props

  const handleChange = (num) => () => {
    const newValue = value + num

    if (newValue < 1) {
      onChange(1)
    } else if (newValue > 10) {
      onChange(10)
    } else {
      onChange(newValue)
    }
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
            id="semester-input"
            label="Semester"
            margin="normal"
            required
            type="number"
            value={value}
            variant="outlined"
          />
        </Box>
        <Box ml={1} my="auto">
          <Fab
            aria-label="decrement semester"
            color="secondary"
            onClick={handleChange(-1)}
          >
            <MinusIcon />
          </Fab>
        </Box>
        <Box ml={1} my="auto">
          <Fab
            aria-label="increment semester"
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
