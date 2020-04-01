import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { getCookie } from '../scripts/helpers'
import { indigo, red } from '@material-ui/core/colors'

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

  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          paletteType: action.payload.paletteType || state.paletteType,
          paletteColors: action.payload.paletteColors || state.paletteColors
        }
      default:
        throw new Error(`Unrecognized type ${action.type}`)
    }
  }, themeInitialOptions)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const preferredType = prefersDarkMode ? 'dark' : 'light'
  const { paletteColors, paletteType = preferredType } = themeOptions

  React.useEffect(() => {
    if (process.browser) {
      const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null')
      const nextPaletteType = getCookie('paletteType')

      dispatch({
        type: 'CHANGE',
        payload: { paletteColors: nextPaletteColors, paletteType: nextPaletteType }
      })
    }
  }, [])

  // persist paletteType
  React.useEffect(() => {
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`
  }, [paletteType])

  const theme = React.useMemo(() => {
    const nextTheme = createMuiTheme(
      {
        nprogress: {
          color: paletteType === 'light' ? '#000' : '#fff'
        },
        palette: {
          type: paletteType,
          primary: {
            dark: indigo[800],
            main: paletteType === 'light' ? indigo[700] : indigo[200],
            light: indigo[600]
          },
          secondary: {
            main: paletteType === 'light' ? indigo[700] : indigo[200]
          },
          error: {
            main: red.A400
          },
          background: {
            default: paletteType === 'light' ? '#fff' : '#36393f'
          },
          text: {
            permanentLight: '#dcddde',
            normal: paletteType === 'light' ? 'black' : '#dcddde',
            reverse: paletteType === 'light' ? '#dcddde' : 'black'
          },
          ...paletteColors
        }
      }
    )

    nextTheme.palette.background.level2 =
      paletteType === 'light' ? nextTheme.palette.grey[100] : '#333'

    nextTheme.palette.background.level1 =
      paletteType === 'light' ? '#fff' : nextTheme.palette.grey[900]

    return nextTheme
  }, [paletteColors, paletteType])

  React.useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    if (process.browser) {
      window.theme = theme
    }
  }, [theme])

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node
}

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme () {
  const dispatch = React.useContext(DispatchContext)
  return React.useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch])
}
