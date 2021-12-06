import { Link, LoaderFunction } from 'remix'
import { RootBoundaryContainer, Title } from '~/components/containers'

/**
 * TODO: 🛠 Tast II
 *
 * We might be tempted to handle the redirection at the
 * client, using a redirect component from the choice of
 * client side routing we have used in the past.
 *
 * But there is a better way to do it in Remix,
 * do server side redirection.
 *
 * Since the data returned from a loader is just a
 * Response object, we can send a Response with a
 * status of 302, and a location header to redirect to.
 *
 * Remix provides us a handy method for doing this,
 * the `redirect` utility from `remix` package
 * https://remix.run/docs/en/v1/api/remix#redirect
 *
 * Sice we redirect to another route before redering,
 * we can skip the default export for this route module.
 */

/**
 * loader function, https://remix.run/docs/en/v1/api/conventions#loader,
 * runs on the server which is called
 * before rendering to provide the data for the route.
 *
 * On the initial request the loaders are called to provide
 * the data to generate the HTML, and on client side
 * navigation the loaders are called via `fetch` by Remix
 *
 * loader function will not be bundled as part of the
 * client bundle, and will be `tree-shaken` out.
 *
 */
export const loader: LoaderFunction = () => {
  return {}
}

export default function Index() {
  return (
    <RootBoundaryContainer>
      <Title>Index Route</Title>
      <Link to='users' className='container__link'>
        Users
      </Link>
    </RootBoundaryContainer>
  )
}
