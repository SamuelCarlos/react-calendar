import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps
} from '@mui/material'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export default function Button(props: ButtonProps) {
  const { onClick, children, ...other } = props
  return (
    <MuiButton
      onClick={onClick}
      variant="contained"
      {...(other as MuiButtonProps)}
    >
      {children}
    </MuiButton>
  )
}
