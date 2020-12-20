import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import { selectInstituteIndex } from 'redux/instituteSlice'
import { selectDepartmentIndex } from 'redux/departmentSlice'
import InstituteSelect from './InstituteSelect'
import DepartmentSelect from './DepartmentSelect'

export default function InstituteDepartmentGroup() {
  const selectedInstituteIndex = useSelector(selectInstituteIndex)
  const selectedDepartmentIndex = useSelector(selectDepartmentIndex)

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <InstituteSelect />
        </Grid>
        <Grid item md={6} xs={12}>
          {selectedInstituteIndex >= 0 ? (
            <DepartmentSelect />
          ) : (
            <Box mt={4}>
              <Typography align="center">
                Select an Institute from the dropdown to see the departments.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
      {selectedInstituteIndex >= 0 && selectedDepartmentIndex < 0 && (
        <Box mt={4}>
          <Typography align="center">
            Select a department from the dropdown to see more.
          </Typography>
        </Box>
      )}
    </>
  )
}
