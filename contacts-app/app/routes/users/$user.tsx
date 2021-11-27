import type { User } from '@prisma/client'
import {
  ActionFunction,
  LoaderFunction,
  LinksFunction,
  MetaFunction,
  useActionData,
  useLocation,
} from 'remix'
import { redirect, json, useCatch, useLoaderData } from 'remix'
import BackLink from '~/components/back-link'
import Catch from '~/components/catch'
import UserForm from '~/components/user-form'
import prisma from '~/db.server'

import createUserStyles from '~/styles/users.new.css'
import type { Errors } from '~/types'

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return { title: 'Uh-Oh!', description: 'No user found' }
  }
  return { title: data.name, description: `Details for user ${data.name}` }
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

  await prisma.user.update({
    where: { id: userId },
    data: { name: name?.toString(), email: email?.toString() },
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

  return user
}

export default function User() {
  const data = useLoaderData<User>()
  const errors = useActionData<{ errors: Errors }>()
  const location = useLocation()

  return (
    <div className='relative'>
      <BackLink className='container__link--back' />
      <UserForm
        key={location.key}
        iconUrl={data.avatar}
        initialEmail={data.email}
        initialName={data.name}
        submitbuttonText='Update User'
        errors={errors?.errors}
      />
    </div>
  )
}

export const CatchBoundary = () => {
  const catchData = useCatch()

  switch (catchData.status) {
    case 404:
      return (
        <Catch
          actionText='Add new User'
          title='Sorry could not find the user'
        />
      )
    default:
      throw new Error(
        `Status of ${catchData.status} was not cought at User CatchBoundary`
      )
  }
}
