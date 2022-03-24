import styled from '@emotion/styled'
import { TableCell as MuiTableCell } from '@mui/material'

// import roboto font
import '@fontsource/roboto'

export const TableCell = styled(MuiTableCell)`
  position: relative;
  transition: 0.2s ease-out;
  font-weight: 800;
  max-height: 120px;
  min-height: 120px;
  height: 120px;

  &:hover {
    cursor: pointer;
    background-color: #d8c49222;
  }

  &.dark {
    background-color: rgba(117, 80, 54, 0.1);
  }

  &.selected {
    background-color: #d8c492;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 1px rgba(117, 80, 54, 0.2);
  }
`
