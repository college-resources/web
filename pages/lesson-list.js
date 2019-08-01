import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  }
}))(TableRow)

function createData (Title, Kind, Hours) {
  return {Title, Kind, Hours}
}

const rows = [
  createData('Μαθηματικα 1', 'ΥΠ', 4),
  createData('Δομημένος Προγραμματισμός', 'ΥΠ', 4),
  createData('Εισαγωγη στην Επιστήμη των Υπολογιστών', 'ΥΠ', 4)
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto'
  }
}))

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

export default function Index (props) {
  const classes = useStyles()
  useEffect(() => {
    props.updateTitle('Lesson List')
  }, [])
  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container>
      <div>
        <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>1ο Εξαμηνο</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper className={classes.root}>
              <Table className={classes.table} >
                <TableHead>
                  <TableRow>
                    <StyledTableCell >Τίτλος</StyledTableCell>
                    <StyledTableCell align="center">Έιδος</StyledTableCell>
                    <StyledTableCell align="center">Ώρες</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <StyledTableRow key={row.Title}>
                      <StyledTableCell component="th" scope="row" allign="left">
                        {row.Title}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.Kind}</StyledTableCell>
                      <StyledTableCell align="center">{row.Hours}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Collapsible Group Item #2</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      </div>
    </Container>
  );
}
