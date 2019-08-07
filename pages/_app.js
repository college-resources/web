import App, { Container } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import NavBar from '../components/NavBar'
import { initializeAuth, saveToken } from '../scripts/auth'
import { withRouter } from 'next/router'

class MyApp extends App {
  constructor (props) {
    super(props)
    this.state = { title: '' }
  }

  updateTitle (newValue) {
    this.setState({ title: newValue })
  }

  componentDidMount () {
    initializeAuth(window, this.props.router)
    saveToken()

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>{this.state.title} | College Resources</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar title={this.state.title} />
          <Component updateTitle={this.updateTitle.bind(this)} {...pageProps} />
        </ThemeProvider>
      </Container>
    )
  }
}

export default withRouter(MyApp)
