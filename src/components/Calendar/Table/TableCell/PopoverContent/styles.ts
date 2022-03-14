import styled from '@emotion/styled'

export const Button = styled.div`
  width: 100%;
  height: 100%;

  box-shadow: inset 1px 1px 3px #00000044;
  border: none;
  margin: 0;
  background-color: transparent;
  cursor: pointer;

  &.edit {
    max-width: 300px;
    padding: 0;
    box-shadow: none;
  }
`
