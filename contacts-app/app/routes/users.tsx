import { Outlet, json, useCatch, NavLink, useLoaderData } from 'remix'
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'

import prisma from '~/db.server'

import { response } from '~/types'

import usersStyles from '../styles/users.css'
import FourOhFour from '~/components/four-oh-four'

type User = {
  name: string
  id: string
  email: string
  avatar: string
}

export const meta: MetaFunction = () => {
  return {
    title: 'Users',
    desctiption: 'Users dashboard page',
  }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: usersStyles }]
}

export const loader: LoaderFunction = async () => {
  const users = await prisma.user.findMany()

  if (!users || users.length === 0) {
    throw json({ message: 'No user exist' }, { status: 404 })
  }

  return response<User[]>(users)
}

export default function Users() {
  const users = useLoaderData<User[]>()

  return (
    <main className='container'>
      <section className='h-full container__flex container__flex__space--equal container__flex--gap-6'>
        <div className='container__center'>
          <h2 className='heading--2xl'>Users</h2>
          <ul>
            {users.map(({ avatar, email, name, id }) => (
              <NavLink
                key={id}
                to={id}
                className={({ isActive }) =>
                  isActive ? 'container__link--active' : ''
                }
              >
                <li className='container__list__element container__flex--gap-6'>
                  <img
                    className='container__flex--self-center'
                    src={avatar}
                    alt=''
                  />
                  <div className='container__flex container__flex--column'>
                    <h3 className='heading--md'>{name}</h3>
                    <em>{email}</em>
                  </div>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className='container__flex container__flex--column container__flex--justify-center'>
          <div className='container__fixed'>
            <div className='fixed__wrapper'>
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export const CatchBoundary = () => {
  const catchData = useCatch()

  switch (catchData.status) {
    case 404:
      return (
        <main className='container container--small container__flex container__flex--column container__flex--center'>
          <FourOhFour actionText='Add new User' title='No users!' />
        </main>
      )
    default:
      throw new Error(
        `Status of ${catchData.status} was not cought at Users CatchBoundary`
      )
  }
}
