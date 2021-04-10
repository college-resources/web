import { forwardRef } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.type === 'dark' && '#00b0f4',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

function StyledLink(props, ref) {
  const { children, href } = props
  const classes = useStyles()

  return (
    <Link href={href} passHref>
      <a className={classes.link} href={href} ref={ref}>
        {children}
      </a>
    </Link>
  )
}

export default forwardRef(StyledLink)
