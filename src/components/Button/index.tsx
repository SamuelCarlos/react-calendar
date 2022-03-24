import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps
} from '@mui/material'

interface ButtonProps extends MuiButtonProps {
  width?: string
}

export default function Button({ children, ...otherProps }: ButtonProps) {
  return <MuiButton {...otherProps}>{children}</MuiButton>
}
