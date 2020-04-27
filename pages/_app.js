import App from 'next/app'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { ThemeProvider } from '../components/ThemeContext'
import UserContext from '../components/UserContext'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import fetch from 'isomorphic-unfetch'
import NavBar from '../components/navigation/NavBar'
import { version } from '../lib/version'

class MyApp extends App {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      user: props.user || null
    }
  }

  static async getInitialProps ({ ctx }) {
    const initialProps = {}

    if (ctx.req) {
      initialProps.user = ctx.req.user && ctx.req.user.profile
    }

    return initialProps
  }

  updateTitle (newValue) {
    this.setState({ title: newValue })
  }

  componentDidMount () {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    // Get profile from session
    if (!this.state.user) {
      fetch('/session/profile')
        .then(res => res.json())
        .then(data => this.setState({ user: data.profile }))
        .catch(err => console.error(err.message))
    }

    console.log('v' + version)
  }

  render () {
    const { Component, pageProps } = this.props
    const userValue = {
      user: this.state.user,
      setUser: user => this.setState({ user })
    }

    return (
      <>
        <Head>
          <title>{this.state.title} | College Resources</title>
        </Head>
        <ThemeProvider>
          <CssBaseline />
          <UserContext.Provider value={userValue}>
            <NavBar title={this.state.title} />
            <Box mt={2}>
              <Component updateTitle={this.updateTitle.bind(this)} {...pageProps} />
            </Box>
          </UserContext.Provider>
        </ThemeProvider>
      </>
    )
  }
}

export default withRouter(MyApp)
