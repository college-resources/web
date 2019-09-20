import { forwardRef } from 'react'
import Link from 'next/link'

export default forwardRef((props, ref) => (
  <Link href={props.href} children={(
    <a {...props} ref={ref} href='#'>
      {props.children}
    </a>
  )} />
))
