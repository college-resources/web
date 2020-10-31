import { forwardRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'

const Styled = withTheme(styled.a`
  color: ${(props) => props.theme.palette.type === 'dark' && '#00b0f4'};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`)

function StyledLink (props, ref) {
  const { children, href } = props

  return (
    <Link href={href}>
      <Styled
        {...props}
        href="#"
        ref={ref}
      >
        {children}
      </Styled>
    </Link>
  )
}

export default forwardRef(StyledLink)
