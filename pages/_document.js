import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import theme from '../src/theme'

class MyDocument extends Document {
  render () {
    return (
      // TODO automatic lang selection
      <html lang='en'>
        <Head>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          <link rel='apple-touch-icon' sizes='57x57' href='/apple-icon-57x57.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='/apple-icon-60x60.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='/apple-icon-76x76.png' />
          <link rel='apple-touch-icon' sizes='114x114' href='/apple-icon-114x114.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/apple-icon-120x120.png' />
          <link rel='apple-touch-icon' sizes='144x144' href='/apple-icon-144x144.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/apple-icon-152x152.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-icon-180x180.png' />
          <link rel='icon' type='image/png' sizes='192x192' href='/android-icon-192x192.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='/favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/manifest.json' />
          <meta name='msapplication-TileColor' content={theme.palette.primary.dark} />
          <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
          <meta name='theme-color' content={theme.palette.primary.dark} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      // eslint-disable-next-line react/jsx-no-undef
      <React.Fragment key='styles'>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  }
}

export default MyDocument
