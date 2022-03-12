import styled from '@emotion/styled'
import {
  TableCell as MuiTableCell,
  TableHead as MuiTableHead
} from '@mui/material'

export const Table = styled.table`
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  max-width: 700px;
  width: 100%;
  min-width: 300px;
`

interface TableCellProps {
  selected: boolean
}

export const TableCell = styled(MuiTableCell)<TableCellProps>`
  position: relative;
  transition: 0.2s ease-out;
  font-weight: 800;

  ${({ selected }) => {
    return (
      selected &&
      `
        background-color: #D8C492;
        border-radius: 5px;
      `
    )
  }}

  &:hover {
    cursor: pointer;

    ::after {
      z-index: 10;
      content: none;
      position: absolute;
      top: 0;
      left: 0;
      background-color: red;
      border-radius: 50%;
    }
  }
`

export const TableHead = styled(MuiTableHead)`
  background-color: #755036;
`
