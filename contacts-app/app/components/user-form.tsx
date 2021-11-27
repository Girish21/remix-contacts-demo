import type { Errors } from '~/types'

type UserFormPops = {
  errors?: Errors
  initialEmail?: string
  initialName?: string
  iconUrl: string
  submitbuttonText?: string
}

const UserForm = ({
  errors,
  initialEmail,
  initialName,
  iconUrl,
  submitbuttonText = 'Create User',
}: UserFormPops) => {
  return (
    <section className='foreground container__banner'>
      <form autoComplete='off' method='post'>
        <div className='container__img__wrapper'>
          <img height='64px' width='64px' src={iconUrl} />
        </div>
        <fieldset className='container__form__wrapper container__flex container__flex--column container__flex--gap-6'>
          <div className='container__flex container__flex--column container__flex--gap-2'>
            <label htmlFor='name'>Name</label>
            <input
              autoComplete='off'
              id='name'
              name='name'
              defaultValue={initialName}
              required
            />
            {errors?.name ? <p>{errors.name}</p> : null}
          </div>
          <div className='container__flex container__flex--column container__flex--gap-2'>
            <label htmlFor='email'>Email</label>
            <input
              autoComplete='off'
              id='email'
              name='email'
              type='email'
              defaultValue={initialEmail}
              required
            />
            {errors?.email ? <p>{errors.email}</p> : null}
          </div>
          <input hidden defaultValue={iconUrl} name='avatar' />
          <button>{submitbuttonText}</button>
        </fieldset>
      </form>
    </section>
  )
}
export default UserForm
