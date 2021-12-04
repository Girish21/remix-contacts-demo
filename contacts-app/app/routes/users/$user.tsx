import type { User } from '@prisma/client'
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from 'remix'
import { useActionData, useCatch, useLoaderData } from 'remix'
import BackLink from '~/components/back-link'
import { FullWidthContainer } from '~/components/containers'
import UserForm from '~/components/user-form'
import createUserStyles from '~/styles/users.new.css'
import type { Errors } from '~/types'

type LoaderData = { user: User }

type ActionData = { errors: Errors }

const isUser = (data: unknown): data is LoaderData => {
  if (!data) {
    return false
  }
  return typeof data === 'object' && Object.keys(data ?? {}).includes('user')
}

export const meta: MetaFunction = () => {
  /**
   * assign approriate meta tags according to the data
   * returned from the loader
   *
   * Hint: make use of `isUser` for type narrowing
   */
  return {}
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: createUserStyles }]
}

export const action: ActionFunction = async ({ request, params }) => {
  /**
   * 1) get the `user` URL param from the function parameter
   */
  /**
   * 2) get the form data from the request
   */
  /**
   * 3) extract the required form fields
   */
  /**
   * 4) run validations on the form data, and return on error
   */
  /**
   * 4) update the user's data
   */
  /**
   * 5) return a redirect
   */
  return {}
}

export const loader: LoaderFunction = async () => {
  /**
   * 1) get the `user` URL param from the function parameter
   */
  /**
   * 2) query the DB for the requested user
   */
  /**
   * 3) if no user exist, throw a not found response
   */
  /**
   * 4) if a user is found, return the user
   */

  return {}
}

export default function User() {
  const { user } = useLoaderData<LoaderData>()
  const errors = useActionData<ActionData>()

  return (
    <FullWidthContainer>
      <BackLink />
      <UserForm
        iconUrl={user.avatar}
        initialEmail={user.email}
        initialName={user.name}
        submitbuttonText='Update User'
        errors={errors?.errors}
      />
    </FullWidthContainer>
  )
}

export const CatchBoundary = () => {
  const catchData = useCatch()

  /**
   * handle 404 using `FourOhFour` component
   */
  return catchData.data
}
