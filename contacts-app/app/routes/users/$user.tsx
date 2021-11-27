import type { User } from '@prisma/client'
import type { LoaderFunction, LinksFunction, MetaFunction } from 'remix'
import { redirect, json, useCatch, useLoaderData } from 'remix'
import FourOhFour from '~/components/four-oh-four'
import UserForm from '~/components/user-form'
import prisma from '~/db.server'

import createUserStyles from '~/styles/users.new.css'

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return { title: 'Uh-Oh!', description: 'No user found' }
  }
  return { title: data.name, description: `Details for user ${data.name}` }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: createUserStyles }]
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

  return (
    <>
      <UserForm
        iconUrl={data.avatar}
        initialEmail={data.email}
        initialName={data.name}
        submitbuttonText='Update User'
      />
    </>
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
        />
      )
    default:
      throw new Error(
        `Status of ${catchData.status} was not cought at User CatchBoundary`
      )
  }
}
