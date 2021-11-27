import { Link } from 'remix'
import ArrowRight from '~/components/arrow-right'

type FourOhFourProps = {
  title: string
  actionText: string
}

const FourOhFour = ({ actionText, title }: FourOhFourProps) => {
  return (
    <section className='foreground container__banner container__flex container__flex--column container__flex--gap-4'>
      <h3 className='heading--2xl container__heading--center'>{title}</h3>
      <Link
        to='/users/new'
        prefetch='intent'
        title='Add new user'
        className='container__link container__link--end'
      >
        {actionText} <ArrowRight />
      </Link>
    </section>
  )
}

export default FourOhFour
