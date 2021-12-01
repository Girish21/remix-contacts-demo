import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useActionData,
} from 'remix'
import { redirect, useLoaderData } from 'remix'
import invariant from 'tiny-invariant'
import BackLink from '~/components/back-link'
import { PageCenterContainer, RelativeContainer } from '~/components/containers'
import { Avatar, Error, Field, FieldSet, Section } from '~/components/form'
import prisma from '~/db.server'
import type { Errors } from '~/types'
import usersStyles from '../styles/users.css'
import createUserStyles from '../styles/users.new.css'

type LoaderData = {
  iconUrl: string
}

export const meta: MetaFunction = () => {
  return { title: 'Add new User' }
}

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: usersStyles },
    { rel: 'stylesheet', href: createUserStyles },
  ]
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const name = formData.get('name')
  const email = formData.get('email')
  const avatar = formData.get('avatar')

  const errors: Errors = {}

  if (!name) {
    errors.name = 'Name is required'
  }
  if (!email) {
    errors.email = 'Email is required'
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  invariant(typeof name === 'string')
  invariant(typeof email === 'string')
  invariant(typeof avatar === 'string')

  await prisma.user.create({ data: { avatar, email, name } })

  throw redirect('/users')
}

export const loader: LoaderFunction = () => {
  const loaderData: LoaderData = {
    iconUrl: `https://avatars.dicebear.com/api/identicon/${Math.random()}.svg`,
  }

  return loaderData
}

export default function NewUser() {
  const { iconUrl } = useLoaderData<LoaderData>()
  const actionData = useActionData<{ errors: Errors }>()
  const errors = actionData?.errors

  return (
    <PageCenterContainer>
      <RelativeContainer>
        <BackLink to='/users' />
        <Section>
          <form method='post' autoComplete='off'>
            <Avatar iconUrl={iconUrl} />
            <FieldSet>
              <Field>
                <label htmlFor='name'>Name</label>
                <input name='name' id='name' required />
                {errors?.name && <Error>{errors.name}</Error>}
              </Field>
              <Field>
                <label htmlFor='email'>Email</label>
                <input name='email' id='email' required />
                {errors?.email && <Error>{errors.email}</Error>}
              </Field>
            </FieldSet>
            <input hidden name='avatar' defaultValue={iconUrl} />
            <button>Create User</button>
          </form>
        </Section>
      </RelativeContainer>
    </PageCenterContainer>
  )
}
