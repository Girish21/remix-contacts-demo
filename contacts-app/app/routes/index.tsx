import { Link, LoaderFunction } from 'remix'
import { RootBoundaryContainer, Title } from '~/components/containers'

/**
 * loader function runs on the server which is called
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
