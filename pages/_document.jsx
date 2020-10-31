/* eslint-disable react/jsx-max-props-per-line, class-methods-use-this */
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { Children } from 'react'
import { ServerStyleSheets } from '@material-ui/styles'
import { themeColor } from 'components/ThemeContext'

class MyDocument extends Document {
  render() {
    return (
      // TODO automatic lang selection
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta
            content="The go-to place for all your college needs."
            name="description"
          />
          <meta content={themeColor} name="theme-color" />

          {/* Appears as a tile, just like a native Windows app in Windows 8 and 10 */}
          <meta content="#2d89ef" name="msapplication-TileColor" />

          {/* Standard for most desktop browsers */}
          <link
            href="/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />

          {/* Apple devices https://realfavicongenerator.net/blog/how-ios-scales-the-apple-touch-icon/ */}
          <link
            href="/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />

          {/* Safari implements pinned tabs and takes advantage of the MacBook Touch Bar.
              This feature relies on an SVG icon. This icon must be monochrome and Safari does the rest. */}
          <link
            color={themeColor}
            href="/safari-pinned-tab.svg"
            rel="mask-icon"
          />

          {/* Google Developer Web App Manifest Recommendation */}
          <link
            href="/android-chrome-192x192.png"
            rel="icon"
            sizes="192x192"
            type="image/png"
          />
          <link href="/manifest.json" rel="manifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    // eslint-disable-next-line no-undef
    styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}

export default MyDocument
