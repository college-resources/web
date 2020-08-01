import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { lightBlue } from '@material-ui/core/colors'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  root: {
    borderBottom: 0
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.type === 'light'
        ? lightBlue[50]
        : theme.palette.primary.light
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.type === 'light'
        ? lightBlue[100]
        : theme.palette.primary.level3
    }
  }
}))(TableRow)

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.common.white
  },
  root: {
    width: '100%'
  },
  summary: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white
  }
}))

export default function Semester (props) {
  const classes = useStyles()
  const { semester } = props
  const { rows } = props
  const [
    expanded,
    setExpanded
  ] = useState(false)

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded
      ? panel
      : false)
  }

  return (
    <div className={classes.root}>
      <Accordion
        className={classes.summary}
        expanded={expanded === (`panel${semester}`)}
        onChange={handleChange(`panel${semester}`)}
      >
        <AccordionSummary
          aria-controls="panel-content"
          expandIcon={<ExpandMoreIcon className={classes.icon} />}
          id="panel1d-header"
        >
          <Typography>
            Εξάμηνο&nbsp;
            {semester}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ overflowX: 'auto', overflowY: 'hidden', padding: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  rowSpan="2"
                  style={{ minWidth: '16px', width: '32px' }}
                >
                  Κωδ.
                </StyledTableCell>
                <StyledTableCell
                  rowSpan="2"
                  style={{ minWidth: '10rem' }}
                >
                  Τίτλος
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  rowSpan="2"
                  style={{ minWidth: '16px', width: '32px' }}
                >
                  Είδος
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  colSpan="2"
                  style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', minWidth: '16px', width: '32px' }}
                >
                  Ώρες
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  rowSpan="2"
                  style={{ minWidth: '16px', width: '32px' }}
                >
                  Π.Μ.
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">
                  Θ
                </StyledTableCell>
                <StyledTableCell align="center">
                  Ε
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell align="center">
                    {row.lessonCode}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.type}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.hoursTheory}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.hoursLab}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.credit}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
