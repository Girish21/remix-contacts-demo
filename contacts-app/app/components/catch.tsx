import { Link } from 'remix'
import ArrowRight from '~/components/arrow-right'

type CatchProps = {
  title: string
  actionText: string
}

const Container: React.FC = ({ children }) => {
  return (
    <section className='foreground container__banner container__flex container__flex--column container__flex--gap-4'>
      {children}
    </section>
  )
}

const Heading: React.FC = ({ children }) => {
  return (
    <h3 className='heading--2xl container__flex--self-center'>{children}</h3>
  )
}

const Catch = ({ actionText, title }: CatchProps) => {
  return (
    <Container>
      <Heading>{title}</Heading>
      <Link
        to='/users/new'
        prefetch='intent'
        className='container__link container__link--end'
      >
        {actionText} <ArrowRight />
      </Link>
    </Container>
  )
}

export default Catch
