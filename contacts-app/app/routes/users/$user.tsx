import type { User } from '@prisma/client'
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from 'remix'
import {
  json,
  redirect,
  useActionData,
  useCatch,
  useLoaderData,
  useLocation,
} from 'remix'
import invariant from 'tiny-invariant'
import BackLink from '~/components/back-link'
import FourOhFour from '~/components/catch'
import { RelativeContainer } from '~/components/containers'
import UserForm from '~/components/user-form'
import prisma from '~/db.server'
import createUserStyles from '~/styles/users.new.css'
import type { Errors } from '~/types'

type LoaderData = {
  user: User
}

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return { title: 'Uh-Oh!', description: 'No user found' }
  }
  return {
    title: (data as LoaderData).user.name,
    description: `Details for user ${(data as LoaderData).user.name}`,
  }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: createUserStyles }]
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = params.user
  const formData = await request.formData()

  const name = formData.get('name')
  const email = formData.get('email')

  const errors: Errors = {}

  if (!name) {
    errors.name = 'Please provide a name'
  }

  if (!email) {
    errors.email = 'Please provide an email'
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  invariant(typeof name === 'string')
  invariant(typeof email === 'string')

  await prisma.user.update({
    where: { id: userId },
    data: { name: name, email: email },
  })

  throw redirect(`/users/${userId}`)
}

export const loader: LoaderFunction = async ({ params }) => {
  const userId = params.user

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw json({ message: 'User not found' }, { status: 404 })
  }

  const loaderData: LoaderData = { user }

  return loaderData
}

export default function User() {
  const { user } = useLoaderData<LoaderData>()
  const errors = useActionData<{ errors: Errors }>()
  const location = useLocation()

  return (
    <RelativeContainer>
      <BackLink />
      <UserForm
        key={location.key}
        iconUrl={user.avatar}
        initialEmail={user.email}
        initialName={user.name}
        submitbuttonText='Update User'
        errors={errors?.errors}
      />
    </RelativeContainer>
  )
}

export const CatchBoundary = () => {
  const catchData = useCatch()

  switch (catchData.status) {
    case 404:
      return (
        <FourOhFour
          actionText='Add new User'
          title='Sorry could not find the user'
          variant='section'
        />
      )
    default:
      throw new Error(
        `Status of ${catchData.status} was not cought at User CatchBoundary`
      )
  }
}
