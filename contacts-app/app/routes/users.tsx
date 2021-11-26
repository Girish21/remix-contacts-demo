import { Outlet, json, useCatch, Link, useLoaderData } from 'remix'
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'

import prisma from '~/db.server'

import { response } from '~/types'
import ArrowRight from '~/components/arrow-right'

import usersStyles from '../styles/users.css'

type User = {
  name: string
  id: string
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

export const loader: LoaderFunction = async ({ request }) => {
  console.log(request.url)
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
      <section className='container__center'>
        <h1 className='heading--2xl'>Users</h1>
        <ul>
          {users.map(({ name, id }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        <Outlet />
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
          <section className='foreground container__banner container__flex container__flex--column container__flex--gap-4'>
            <h1 className='heading--2xl container__heading--center'>
              No users!
            </h1>
            <Link
              to='new'
              prefetch='intent'
              title='Add new user'
              className='container__link container__link--end'
            >
              Add new User <ArrowRight />
            </Link>
          </section>
        </main>
      )
  }
}
