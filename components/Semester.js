import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { lightBlue } from '@material-ui/core/colors'

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails)

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
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto'
  }
}))

const ExpansionPanel = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiExpansionPanel)

const ExpansionPanelSummary = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  expanded: {}
}))(MuiExpansionPanelSummary)

export default function Semester (props) {
  const classes = useStyles()
  const rows = props.rows
  const [expanded, setExpanded] = React.useState('panel1')
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <ExpansionPanelSummary aria-controls='panel1d-content' id='panel1d-header'>
        <Typography>1ο Εξάμηνο</Typography>
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
  )
}
