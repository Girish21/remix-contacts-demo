import { Link } from 'remix'
import ArrowRight from '~/components/arrow-right'
import { MessageContainer, PageCenterContainer, Title } from './containers'

type CatchProps = {
  title: string
  actionText: string
}

type FourOhFourProps = CatchProps & {
  variant?: 'full_page' | 'section'
}

const Catch = ({ actionText, title }: CatchProps) => {
  return (
    <MessageContainer>
      <Title>{title}</Title>
      <Link
        to='/users/new'
        prefetch='intent'
        className='container__link container__link--end'
      >
        {actionText} <ArrowRight />
      </Link>
    </MessageContainer>
  )
}

const FourOhFour = ({ variant = 'full_page', ...rest }: FourOhFourProps) => {
  if (variant === 'full_page') {
    return (
      <PageCenterContainer variant='small'>
        <Catch {...rest} />
      </PageCenterContainer>
    )
  }

  return <Catch {...rest} />
}

export default FourOhFour
