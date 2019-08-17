/* global fetch */

import App, { Container } from 'next/app'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import NavBar from '../components/NavBar'
import UserContext from '../components/UserContext'

class MyApp extends App {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      user: props.user || null
    }
  }

  static async getInitialProps ({ ctx }) {
    if (ctx.req) {
      return { user: ctx.req.user && ctx.req.user.profile }
    }
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
        .then(profile => this.setState({ user: profile }))
    }
  }

  render () {
    const { Component, pageProps } = this.props
    const userValue = {
      user: this.state.user,
      setUser: user => this.setState({ user })
    }

    return (
      <Container>
        <Head>
          <title>{this.state.title} | College Resources</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserContext.Provider value={userValue}>
            <NavBar title={this.state.title} />
            <Component updateTitle={this.updateTitle.bind(this)} {...pageProps} />
          </UserContext.Provider>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withRouter(MyApp)
