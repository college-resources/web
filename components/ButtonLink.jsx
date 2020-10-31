import { forwardRef } from 'react'
import Link from 'next/link'

function ButtonLink(props, ref) {
  const { children, href } = props

  return (
    <Link href={href}>
      <a {...props} href="#" ref={ref}>
        {children}
      </a>
    </Link>
  )
}

export default forwardRef(ButtonLink)
