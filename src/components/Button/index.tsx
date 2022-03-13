import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps
} from '@mui/material'

interface ButtonProps extends MuiButtonProps {
  width?: string
}

export default function Button({
  children,
  variant = 'contained',
  ...otherProps
}: ButtonProps) {
  return (
    <MuiButton variant={variant} {...otherProps}>
      {children}
    </MuiButton>
  )
}
