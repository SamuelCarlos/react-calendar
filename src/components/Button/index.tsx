import { Button as ChakraButton } from '@chakra-ui/react'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export default function Button(props: ButtonProps) {
  const { onClick, children } = props

  return <ChakraButton onClick={onClick}>{children}</ChakraButton>
}
