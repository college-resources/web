import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { getCookie } from '../scripts/helpers'
import { indigo } from '@material-ui/core/colors'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const themeColor = indigo['800']

const themeInitialOptions = {
  paletteColors: {}
}

export const DispatchContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`')
})

if (process.env.NODE_ENV !== 'production') {
  DispatchContext.displayName = 'ThemeDispatchContext'
}

export function ThemeProvider (props) {
  const { children } = props

  const [
    themeOptions,
    dispatch
  ] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'CHANGE':
          return {
            ...state,
            paletteColors: action.payload.paletteColors || state.paletteColors,
            paletteType: action.payload.paletteType || state.paletteType
          }
        default:
          throw new Error(`Unrecognized type ${action.type}`)
      }
    },
    themeInitialOptions
  )

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const preferredType = prefersDarkMode
    ? 'dark'
    : 'light'
  const { paletteColors, paletteType = preferredType } = themeOptions

  React.useEffect(
    () => {
      if (process.browser) {
        const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null')
        const nextPaletteType = getCookie('paletteType')

        dispatch({
          payload: { paletteColors: nextPaletteColors, paletteType: nextPaletteType },
          type: 'CHANGE'
        })
      }
    },
    []
  )

  // Persist paletteType
  React.useEffect(
    () => {
      document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`
    },
    [paletteType]
  )

  const theme = React.useMemo(
    () => {
      const nextTheme = createMuiTheme({
        nprogress: {
          color: paletteType === 'light'
            ? '#000'
            : '#fff'
        },
        palette: {
          background: {
            default: paletteType === 'light'
              ? '#fff'
              : '#2f3136',
            tertiary: paletteType === 'light'
              ? '#fff'
              : '#202225'
          },
          primary: {
            dark: indigo[800],
            level3: indigo[500],
            light: indigo[600],
            main: indigo[700]
          },
          secondary: {
            main: indigo[700]
          },
          text: {
            normal: paletteType === 'light'
              ? 'black'
              : '#dcddde',
            permanentLight: '#dcddde',
            reverse: paletteType === 'light'
              ? '#dcddde'
              : 'black'
          },
          type: paletteType,
          ...paletteColors
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

      if (paletteType === 'dark') nextTheme.palette.background.paper = '#36393f'

      nextTheme.palette.background.level2 = paletteType === 'light'
        ? nextTheme.palette.grey[100]
        : '#333'

      nextTheme.palette.background.level1 = paletteType === 'light'
        ? '#fff'
        : nextTheme.palette.grey[900]

      return nextTheme
    },
    [
      paletteColors,
      paletteType
    ]
  )

  React.useEffect(
    () => {
    // Expose the theme as a global variable so people can play with it.
      if (process.browser) {
        window.theme = theme
      }
    },
    [theme]
  )

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme () {
  const dispatch = React.useContext(DispatchContext)
  return React.useCallback(
    (options) => dispatch({ payload: options, type: 'CHANGE' }),
    [dispatch]
  )
}
