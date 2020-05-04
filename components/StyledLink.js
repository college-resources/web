import { forwardRef } from 'react'
import Link from 'next/link'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'

const Styled = withTheme(styled.a`
  color: ${props => props.theme.palette.type === 'dark' && '#00b0f4'};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`)

const StyledLink = forwardRef(function StyledLink (props, ref) {
  return (
    <Link
      href={props.href}
      children={(
        <Styled {...props} ref={ref} href='#'>
          {props.children}
        </Styled>
      )}
    />
  )
})

export default StyledLink
