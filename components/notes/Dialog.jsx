import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/IconButton'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    '& .MuiDialog-paperWidthLg.MuiDialog-paperScrollBody': {
      margin: 0,
      maxWidth: '1280px',
      width: 'calc(100% - 32px)'
    }
  },
  content: {
    padding: '8px 16px'
  }
})

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle
      className={classes.root}
      disableTypography
      style={{ wordWrap: 'break-word', width: 'calc(100% - 64px)' }}
      {...other}
    >
      <Typography
        variant="h6"
      >
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

export default function ScrollDialog (props) {
  const classes = useStyles()
  const { open, setOpen, texts, title } = props

  function handleClose () {
    setOpen(false)
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(
    () => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef
        if (descriptionElement !== null) {
          descriptionElement.focus()
        }
      }
    },
    [open]
  )

  return (
    <div>
      <Dialog
        aria-describedby="scroll-dialog-description"
        aria-labelledby="scroll-dialog-title"
        className={classes.root}
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        open={open}
        scroll="body"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </DialogTitle>
        <DialogContent
          className={classes.content}
          dividers
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {
              texts.map((text, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <p key={`text-${index}`}>
                  {text}
                </p>
              ))
            }
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}
