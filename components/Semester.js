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
  }
}))

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
      <ExpansionPanel
        className={classes.summary}
        expanded={expanded === ('panel' + semester)}
        onChange={handleChange('panel' + semester)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon className={classes.icon} />}
          aria-controls='panel-content'
          id='panel1d-header'
        >
          <Typography>Εξάμηνο {semester}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: 0, overflowX: 'auto', overflowY: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell rowSpan='2' style={{ minWidth: '16px', width: '32px' }} align='center'>Κωδ.</StyledTableCell>
                <StyledTableCell rowSpan='2' style={{ minWidth: '10rem' }}>Τίτλος</StyledTableCell>
                <StyledTableCell rowSpan='2' style={{ minWidth: '16px', width: '32px' }} align='center'>Είδος</StyledTableCell>
                <StyledTableCell colSpan='2' style={{ minWidth: '16px', width: '32px' }} align='center'>Ώρες</StyledTableCell>
                <StyledTableCell rowSpan='2' style={{ minWidth: '16px', width: '32px' }} align='center'>Π.Μ.</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align='center'>Θ</StyledTableCell>
                <StyledTableCell align='center'>Ε</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell align='center'>{row.lessonCode}</StyledTableCell>
                  <StyledTableCell align='left'>{row.name}</StyledTableCell>
                  <StyledTableCell align='center'>{row.type}</StyledTableCell>
                  <StyledTableCell align='center'>{row.hoursTheory}</StyledTableCell>
                  <StyledTableCell align='center'>{row.hoursLab}</StyledTableCell>
                  <StyledTableCell align='center'>{row.credit}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
