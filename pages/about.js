import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

class Page extends React.Component {
  static getInitialProps ({ query }) {
    return { query }
  }

  render () {
    const { router } = this.props
    console.log(router.query)
    const str = JSON.stringify(router.query, null, 4)

    return (
      <div>
        {str}
        <div>Click <Link href={{ pathname: 'about', query: { token: '12345' } }}><a>here</a></Link> to add query to url</div>
      </div>
    )
  }
}
export default withRouter(Page)
