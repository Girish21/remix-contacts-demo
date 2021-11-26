import * as React from 'react'
import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  useLoaderData,
} from 'remix'
import { redirect } from 'remix'

import prisma from '~/db.server'
import { response } from '~/types'

import usersStyles from '../styles/users.css'
import createUserStyles from '../styles/users.new.css'

type LoaderData = {
  iconUrl: string
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
  return response<LoaderData>({
    iconUrl: `https://avatars.dicebear.com/api/identicon/${Math.random()}.svg`,
  })
}

export default function NewUser() {
  const { iconUrl } = useLoaderData<LoaderData>()

  return (
    <main className='container container--small container__flex container__flex--column container__flex--center'>
      <section className='foreground container__banner'>
        <form autoComplete='password' method='post'>
          <div className='container__img__wrapper'>
            <img height='64px' width='64px' src={iconUrl} />
          </div>
          <fieldset className='container__form__wrapper container__flex container__flex--column container__flex--gap-6'>
            <div className='container__flex container__flex--column container__flex--gap-2'>
              <label htmlFor='name'>Name</label>
              <input autoComplete='off' id='name' name='name' required />
            </div>
            <div className='container__flex container__flex--column container__flex--gap-2'>
              <label htmlFor='email'>Email</label>
              <input autoComplete='off' id='email' name='email' required />
            </div>
            <input hidden defaultValue={iconUrl} name='avatar' />
            <button>Create User</button>
          </fieldset>
        </form>
      </section>
    </main>
  )
}
