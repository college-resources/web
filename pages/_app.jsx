import { Provider, connect } from 'react-redux'
import { session, setUser } from 'redux/authSlice'
import store, { wrapper } from 'redux/store'
import App from 'next/app'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import NavBar from 'components/navigation/NavBar'
import { StylesProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'components/ThemeContext'
import { version } from 'lib/version'
import { withRouter } from 'next/router'

class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = { title: '' }
    this._updateTitle = this._updateTitle.bind(this)
    this.props.setUser(this.props.ctxUser)
  }

  static getInitialProps({ ctx }) {
    const initialProps = {}

    if (ctx.req) {
      initialProps.ctxUser = ctx.req.user && ctx.req.user.profile
    }

    return initialProps
  }

  _updateTitle(newValue) {
    this.setState({ title: newValue })
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    // Get profile from session
    if (!this.props.user) {
      this.props.session()
    }

    console.log(`v${version}`)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <meta
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            name="viewport"
          />
          <title>{this.state.title} | College Resources</title>
        </Head>
        <StylesProvider injectFirst>
          <ThemeProvider>
            <CssBaseline />
            <Provider store={store}>
              <NavBar title={this.state.title} />
              <Box mt={2}>
                <Component updateTitle={this._updateTitle} {...pageProps} />
              </Box>
            </Provider>
          </ThemeProvider>
        </StylesProvider>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  session,
  setUser
}

export default wrapper.withRedux(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(MyApp))
)
