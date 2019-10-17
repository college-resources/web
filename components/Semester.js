import { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { lightBlue } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  icon: {
    color: 'white'
  },
  summary: {
    backgroundColor: theme.palette.secondary.dark,
    color: 'white'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}))

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: lightBlue[50]
    },
    '&:nth-of-type(odd)': {
      backgroundColor: lightBlue[100]
    }
  }
}))(TableRow)

export default function (props) {
  const classes = useStyles()
  const semester = props.semester
  const rows = props.rows
  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.summary} expanded={expanded === ('panel' + semester)} onChange={handleChange('panel' + semester)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.icon} />} aria-controls='panel1d-content' id='panel1d-header'>
          <Typography>Εξάμηνο {semester}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: 0 }}>
          <Table className={classes.table}>
            <TableHead style={{ border: 0 }}>
              <TableRow>
                <StyledTableCell>Τίτλος</StyledTableCell>
                <StyledTableCell align='center'>department</StyledTableCell>
                <StyledTableCell align='center'>semester</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component='th' scope='row' allign='left'>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{row.department.name}</StyledTableCell>
                  <StyledTableCell align='center'>{row.semester}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
