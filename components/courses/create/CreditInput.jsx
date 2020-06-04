import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import MinusIcon from '@material-ui/icons/Remove'
import PlusIcon from '@material-ui/icons/Add'
import React from 'react'
import TextField from '@material-ui/core/TextField'

export default function CreditInput (props) {
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
            id="credit-input"
            label="Credit"
            margin="normal"
            required
            type="number"
            value={value}
            variant="outlined"
          />
        </Box>
        <Box
          ml={1}
          my="auto"
        >
          <Fab
            aria-label="decrement credit"
            color="secondary"
            onClick={handleChange(-1)}
          >
            <MinusIcon />
          </Fab>
        </Box>
        <Box
          ml={1}
          my="auto"
        >
          <Fab
            aria-label="increment credit"
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
