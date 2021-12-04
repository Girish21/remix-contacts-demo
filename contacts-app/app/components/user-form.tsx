import useFocus from '~/hooks/useFocus'
import type { Errors } from '~/types'
import { Avatar, Error, Field, FieldSet, Section } from './form'

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
  const focusRef = useFocus<HTMLInputElement>()

  return (
    <Section>
      <form autoComplete='off' method='post'>
        <Avatar iconUrl={iconUrl} />
        <FieldSet>
          <Field>
            <label htmlFor='name'>Name</label>
            <input
              ref={focusRef}
              autoComplete='off'
              id='name'
              name='name'
              defaultValue={initialName}
              required
            />
            {errors?.name && <Error>{errors.name}</Error>}
          </Field>
          <Field>
            <label htmlFor='email'>Email</label>
            <input
              autoComplete='off'
              id='email'
              name='email'
              type='email'
              defaultValue={initialEmail}
              required
            />
            {errors?.email && <Error>{errors.email}</Error>}
          </Field>
          <input hidden defaultValue={iconUrl} name='avatar' />
          <button>{submitbuttonText}</button>
        </FieldSet>
      </form>
    </Section>
  )
}
export default UserForm
