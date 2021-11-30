import { Link } from 'remix'
import ChevronLeft from './chevron-left'

type BackLinkProps = {
  className?: string
  to?: string
}

const BackLink = ({
  to = '..',
  className = 'container__link--back',
}: BackLinkProps) => {
  return (
    <Link to={to} className={className}>
      <ChevronLeft />
      Back
    </Link>
  )
}

export default BackLink
