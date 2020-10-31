import TextField from '@material-ui/core/TextField'

export default function TypeInput(props) {
  const { onChange, value } = props

  return (
    <TextField
      fullWidth
      id="type-input"
      label="Type"
      margin="normal"
      onChange={onChange}
      required
      value={value}
      variant="outlined"
    />
  )
}
