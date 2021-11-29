import * as React from 'react'
import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix'
import { redirect } from 'remix'
import BackLink from '~/components/back-link'
import UserForm from '~/components/user-form'

import prisma from '~/db.server'

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

  if (!name || !email || !avatar) throw redirect('/users/new')
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof avatar !== 'string'
  )
    throw redirect('/users/new')

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

  return (
    <main className='container container--small container__flex container__flex--column container__flex--center'>
      <div className='relative'>
        <BackLink className='container__link--back' to='/users' />
        <UserForm iconUrl={iconUrl} />
      </div>
    </main>
  )
}
