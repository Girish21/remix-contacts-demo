import { internet, name, random } from 'faker'
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'
import { NavLink, Outlet, useCatch, useLoaderData } from 'remix'
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

type User = {
  name: string
  id: string
  email: string
  avatar: string
}

type LoaderData = {
  users: User[]
}

/**
 * meta function will be used to set the meta tags for the document.
 *
 * Let's add the title and description for the route `/users`
 */
export const meta: MetaFunction = () => {
  return {}
}

/**
 * Let's attach the styles required for `/users` route.
 *
 * Import the styles from
 * ~/styles/users.css
 * ~/styles/users.lg.css (media: '(min-width: 1024px)')
 * ~/styles/users.md.css (media: '(min-width: 720px)')
 */
export const links: LinksFunction = () => {
  return []
}

export const loader: LoaderFunction = async () => {
  const users = Array.from({ length: 5 }).map(() => ({
    name: name.findName(),
    email: internet.email(),
    avatar: `https://avatars.dicebear.com/api/identicon/${Math.random()}.svg`,
    id: random.alphaNumeric(),
  }))

  /**
   * 1) fetch all the users
   */
  /**
   * 2) handle no users found (404)
   */
  /**
   * 3) return the fetched users
   */

  const loaderData: LoaderData = { users }

  return loaderData
}

export default function Users() {
  const { users } = useLoaderData<LoaderData>()

  return (
    <UsersPage>
      <UsersSection>
        <SectionHeader>
          <Title>Users</Title>
          <NewUser />
        </SectionHeader>
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
      <UserEditSection>
        <Outlet />
      </UserEditSection>
    </UsersPage>
  )
}

/**
 * the component which is rendered when ever
 * a response is "thrown" from action or loader
 */
export const CatchBoundary = () => {
  const catchData = useCatch()

  /**
   * handle 404 using `FourOhFour` component
   */
  return catchData.data
}
