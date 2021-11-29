import { Outlet, json, useCatch, NavLink, useLoaderData } from 'remix'
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'

import prisma from '~/db.server'

import Catch from '~/components/catch'

import usersStyles from '../styles/users.css'
import usersMdStyles from '../styles/users.md.css'
import usersLgStyles from '../styles/users.lg.css'
import NewUser from '~/components/new-user'
import {
  Card,
  Emphasis,
  Header,
  Image,
  List,
  PageCenterContainer,
  SecondaryTitle,
  Title,
  UsersPage,
  UsersSection,
} from '~/components/containers'

type User = {
  name: string
  id: string
  email: string
  avatar: string
}

type LoaderData = {
  users: User[]
}

export const meta: MetaFunction = () => {
  return {
    title: 'Users',
    desctiption: 'Users dashboard page',
  }
}

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: usersStyles },
    { rel: 'stylesheet', href: usersMdStyles, media: '(min-width: 720px)' },
    { rel: 'stylesheet', href: usersLgStyles, media: '(min-width: 1024px)' },
  ]
}

export const loader: LoaderFunction = async () => {
  const users = await prisma.user.findMany()

  if (!users || users.length === 0) {
    throw json({ message: 'No user exist' }, { status: 404 })
  }

  const loaderData: LoaderData = { users }

  return loaderData
}

export default function Users() {
  const { users } = useLoaderData<LoaderData>()

  return (
    <UsersPage>
      <UsersSection>
        <Header>
          <Title>Users</Title>
          <NewUser />
        </Header>
        <List>
          {users.map(({ avatar, email, name, id }) => (
            <NavLink
              key={id}
              to={id}
              className={({ isActive }) =>
                isActive ? 'container__link--active' : ''
              }
            >
              <Card>
                <Image src={avatar} />
                <SecondaryTitle>{name}</SecondaryTitle>
                <Emphasis>{email}</Emphasis>
              </Card>
            </NavLink>
          ))}
        </List>
      </UsersSection>
      <div className='container__flex container__flex--column container__flex--center'>
        <div className='container__fixed'>
          <div className='fixed__wrapper'>
            <Outlet />
          </div>
        </div>
      </div>
    </UsersPage>
  )
}

export const CatchBoundary = () => {
  const catchData = useCatch()

  switch (catchData.status) {
    case 404:
      return (
        <PageCenterContainer>
          <Catch actionText='Add new User' title='No users!' />
        </PageCenterContainer>
      )
    default:
      throw new Error(
        `Status of ${catchData.status} was not cought at Users CatchBoundary`
      )
  }
}
