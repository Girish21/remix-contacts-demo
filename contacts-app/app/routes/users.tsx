import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useTransition,
} from 'remix'
import { json, NavLink, Outlet, useCatch, useLoaderData } from 'remix'
import FourOhFour from '~/components/catch'
import {
  Card,
  Emphasis,
  Image,
  List,
  SecondaryTitle,
  SectionHeader,
  Title,
  UserEditSection,
  UsersPage,
  UsersSection,
} from '~/components/containers'
import NewUser from '~/components/new-user'
import prisma from '~/db.server'
import usersStyles from '~/styles/users.css'
import usersLgStyles from '~/styles/users.lg.css'
import usersMdStyles from '~/styles/users.md.css'

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
  const transition = useTransition()

  return (
    <UsersPage>
      <UsersSection>
        <SectionHeader>
          <Title>Users</Title>
          <NewUser />
        </SectionHeader>
        <List>
          {users.map(({ avatar, email, name, id }) => {
            const optimisticCondition =
              transition.submission?.action === `/users/${id}` &&
              (transition.state === 'submitting' ||
                transition.state === 'loading')
            const formData = transition.submission?.formData
            const optimisticName = optimisticCondition
              ? formData?.get('name')
              : name
            const optimisticEmail = optimisticCondition
              ? formData?.get('email')
              : email

            return (
              <NavLink
                key={id}
                to={id}
                className={({ isActive }) =>
                  isActive ? 'container__link--active' : ''
                }
              >
                <Card>
                  <Image src={avatar} />
                  <SecondaryTitle>{optimisticName}</SecondaryTitle>
                  <Emphasis>{optimisticEmail}</Emphasis>
                </Card>
              </NavLink>
            )
          })}
        </List>
      </UsersSection>
      <UserEditSection>
        <Outlet />
      </UserEditSection>
    </UsersPage>
  )
}

export const CatchBoundary = () => {
  const catchData = useCatch()

  switch (catchData.status) {
    case 404:
      return <FourOhFour actionText='Add new User' title='No Users!' />
    default:
      throw new Error(
        `Status of ${catchData.status} was not cought at Users CatchBoundary`
      )
  }
}
