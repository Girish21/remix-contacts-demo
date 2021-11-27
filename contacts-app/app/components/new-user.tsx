import { Link } from 'remix'
import AddIcon from './add-icon'

const NewUser = () => {
  return (
    <Link to='/users/new' className='container__link--new container__link--md'>
      Add User <AddIcon />
    </Link>
  )
}

export default NewUser
