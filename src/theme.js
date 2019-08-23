import { createMuiTheme } from '@material-ui/core/styles'
import { indigo, red, lightBlue } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      dark: indigo[800],
      main: indigo[700],
      light: indigo[600]
    },
    secondary: {
      dark: lightBlue[800],
      main: lightBlue[700],
      light: lightBlue[600]
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
})

export default theme
