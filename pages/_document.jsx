/* eslint-disable react/jsx-max-props-per-line, class-methods-use-this */
import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheets } from '@material-ui/styles'
import { themeColor } from 'components/ThemeContext'

class MyDocument extends Document {
  render () {
    return (
      // TODO automatic lang selection
      <html lang="en">
        <Head>
          <link href="/apple-icon-57x57.png" rel="apple-touch-icon" sizes="57x57" />
          <link href="/apple-icon-60x60.png" rel="apple-touch-icon" sizes="60x60" />
          <link href="/apple-icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
          <link href="/apple-icon-76x76.png" rel="apple-touch-icon" sizes="76x76" />
          <link href="/apple-icon-114x114.png" rel="apple-touch-icon" sizes="114x114" />
          <link href="/apple-icon-120x120.png" rel="apple-touch-icon" sizes="120x120" />
          <link href="/apple-icon-144x144.png" rel="apple-touch-icon" sizes="144x144" />
          <link href="/apple-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
          <link href="/apple-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/android-icon-192x192.png" rel="icon" sizes="192x192" type="image/png" />
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
          <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/manifest.json" rel="manifest" />
          <meta content={themeColor} name="msapplication-TileColor" />
          <meta content="/ms-icon-144x144.png" name="msapplication-TileImage" />
          <meta content={themeColor} name="theme-color" />
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='description' content='Description' />
          <meta name='keywords' content='Keywords' />
          <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
          <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
          <link rel='apple-touch-icon' href='/apple-icon.png' />
          <meta name='theme-color' content='#283593' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
  })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    // eslint-disable-next-line no-undef
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  }
}

export default MyDocument
