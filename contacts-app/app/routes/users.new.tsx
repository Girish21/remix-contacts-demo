import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from 'remix'
import BackLink from '~/components/back-link'
import {
  FullWidthContainer,
  PageCenterContainer,
} from '~/components/containers'
import { Section } from '~/components/form'
import usersStyles from '~/styles/users.css'
import usersLgStyles from '~/styles/users.lg.css'
import usersMdStyles from '~/styles/users.md.css'
import createUserStyles from '~/styles/users.new.css'
import type { Errors } from '~/types'

type LoaderData = { iconUrl: string }

type ActionData = { errors: Errors }

export const meta: MetaFunction = () => {
  return { title: 'Add new User' }
}

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: usersStyles },
    { rel: 'stylesheet', href: createUserStyles },
    { rel: 'stylesheet', href: usersMdStyles, media: '(min-width: 720px)' },
    { rel: 'stylesheet', href: usersLgStyles, media: '(min-width: 1024px)' },
  ]
}

/**
 * action function handles all the non-GET
 * data mutations and other action request.
 *
 * This function runs on the server.
 *
 * One of the unique feature of Remix is
 * automatic data validation after a mutation
 * (we'll look at this in more detail in the next section).
 *
 * When a action is called, all the loaders of the routes
 * on the screen are called, fetching fresh data from DB!
 */
export const action: ActionFunction = () => {
  /**
   * let's handle form submission
   */
  /**
   * 1) get the form data from the request
   */
  /**
   * 2) extract the required form fields
   */
  /**
   * 3) run validations on the form data, and return on error
   */
  /**
   * 4) create a new record
   */
  /**
   * 5) return a redirect
   */
  return {}
}

export const loader: LoaderFunction = () => {
  const loaderData: LoaderData = {
    iconUrl: `https://avatars.dicebear.com/api/identicon/${Math.random()}.svg`,
  }

  return loaderData
}

export default function NewUser() {
  return (
    <PageCenterContainer>
      <FullWidthContainer>
        <BackLink to='/users' />
        <Section>
          <form>
            {/*
             * 1) let's make the form submit to be a POST request
             * 2) add `Avatar` component for avatar preview
             * 3) add `FieldSet` component to wrap the form fields
             *   i) create form `Field` for name and email
             *   ii) show field errors, if exist
             */}
          </form>
        </Section>
      </FullWidthContainer>
    </PageCenterContainer>
  )
}
