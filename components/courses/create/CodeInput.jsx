import TextField from '@material-ui/core/TextField'

export default function CodeInput (props) {
  const { onChange, value } = props

  return (
    <TextField
      fullWidth
      id="code-input"
      label="Code"
      margin="normal"
      onChange={onChange}
      required
      value={value}
      variant="outlined"
    />
  )
}
