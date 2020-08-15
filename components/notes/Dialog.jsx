import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'

export default function ScrollDialog (props) {
  const { open, setOpen, text } = props

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
        onClose={handleClose}
        open={open}
        scroll="body"
      >
        <DialogTitle id="scroll-dialog-title">
          Like, Comment, Subscribe
        </DialogTitle>
        <DialogContent dividers={false}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {text}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}
