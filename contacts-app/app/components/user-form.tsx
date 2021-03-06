import { Form } from 'remix'
import useFocus from '~/hooks/useFocus'
import useInTransition from '~/hooks/useInTransition'
import type { Errors } from '~/types'
import { Loader } from './containers'
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
  const inTransition = useInTransition()

  return (
    <Section>
      <Form autoComplete='off' method='post'>
        <Avatar iconUrl={iconUrl} />
        <FieldSet disabled={inTransition}>
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
          <button>
            {inTransition ? (
              <Loader>{submitbuttonText}</Loader>
            ) : (
              <>{submitbuttonText}</>
            )}
          </button>
        </FieldSet>
      </Form>
    </Section>
  )
}
export default UserForm
