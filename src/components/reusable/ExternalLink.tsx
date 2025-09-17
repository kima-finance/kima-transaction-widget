interface Props {
  to: string
  children?: any
  className?: string
  rest?: any
}

const ExternalLink = ({ to, children, className, rest }: Props) => (
  <a
    className={className}
    href={to}
    target='_blank'
    rel='noreferrer noopener'
    {...rest}
  >
    {children}
  </a>
)

export default ExternalLink
