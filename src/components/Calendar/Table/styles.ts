import styled from '@emotion/styled'
import { TableHead as MuiTableHead } from '@mui/material'

// import roboto font
import '@fontsource/roboto'

export const Table = styled.table`
  padding: 10px;
  max-width: 1200px;
  width: 100%;
  min-width: 300px;
  table-layout: fixed;

  box-shadow: 0px 0px 10px 1px rgba(117, 80, 54, 0.2);

  .MuiTableCell-root {
    border: none;
  }

  th {
    height: 40px;
  }

  td,
  th {
    min-width: 30px;
    padding: 0;
  }
`

export const TableHead = styled(MuiTableHead)`
  background-color: #45342d;
  min-height: 20px;

  th {
    color: #d8c492;
    font-size: 1.6rem;
    font-weight: 600;
    font-family: 'roboto';
    border: 0;
    padding: 10px;
    text-align: center;

    vertical-align: middle;
  }

  th.weekday {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: left;
    background-color: #755036;
  }
`

export const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #d8c492;
  margin: 0;
`
