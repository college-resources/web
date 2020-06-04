import App from 'next/app'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import NavBar from 'components/navigation/NavBar'
import React from 'react'
import { StylesProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'components/ThemeContext'
import UserContext from 'components/UserContext'
import { version } from 'lib/version'
import { withRouter } from 'next/router'

class MyApp extends App {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      user: props.user || null
    }
    this._updateTitle = this._updateTitle.bind(this)
  }

  static getInitialProps ({ ctx }) {
    const initialProps = {}

    if (ctx.req) {
      initialProps.user = ctx.req.user && ctx.req.user.profile
    }

    return initialProps
  }

  _updateTitle (newValue) {
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
        .then((res) => res.json())
        .then((data) => this.setState({ user: data.profile }))
        .catch((err) => console.error(err.message))
    }

    console.log(`v${version}`)
  }

  render () {
    const { Component, pageProps } = this.props
    const userValue = {
      setUser: (user) => this.setState({ user }),
      user: this.state.user
    }

    return (
      <>
        <Head>
          <title>
            {this.state.title}
            {' '}
            | College Resources
          </title>
        </Head>
        <StylesProvider injectFirst>
          <ThemeProvider>
            <CssBaseline />
            <UserContext.Provider value={userValue}>
              <NavBar title={this.state.title} />
              <Box mt={2}>
                <Component
                  updateTitle={this._updateTitle}
                  {...pageProps}
                />
              </Box>
            </UserContext.Provider>
          </ThemeProvider>
        </StylesProvider>
      </>
    )
  }
}

export default withRouter(MyApp)
