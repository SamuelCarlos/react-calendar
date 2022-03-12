interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export default function Button(props: ButtonProps) {
  const { onClick, children } = props

  return <button onClick={onClick}>{children}</button>
}
