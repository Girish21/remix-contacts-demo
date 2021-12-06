import type { LinksFunction } from 'remix'
import { LiveReload, Links, Outlet, Meta, useCatch } from 'remix'

import { RootBoundaryContainer, Title } from '~/components/containers'
import FourOhFour from '~/components/catch'

/**
 * links function specifies which `<link>` elements needs to be
 * added to the page when the route is visited. When navigating
 * away the `<link>` elements will be removed
 *
 * TODO: 🛠 Tast I
 *
 * Here we're going to link the global stylesheets and
 * preload custom fonts.
 *
 * Import stylesheet from
 * ~/styles/global.css,
 * ~/styles/font.css
 * and add it as part of the links export
 *
 * Refer https://remix.run/docs/en/v1/api/conventions#links
 * for more use cases of links export
 */
export const links: LinksFunction = () => {
  return [
    { rel: 'icon', href: '/favicon.ico' },
    {
      rel: 'prelaod',
      as: 'font',
      href: '/fonts/Poppins-Regular.ttf',
      type: 'font/ttf',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'prelaod',
      as: 'font',
      href: '/fonts/Poppins-Medium.ttf',
      type: 'font/ttf',
      crossOrigin: 'anonymous',
    },
  ]
}

const Document = ({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}

/**
 * Remix uses the default export from the routes module
 * to render when the route matches
 *
 * https://remix.run/docs/en/v1/api/conventions#default-export
 */
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export const CatchBoundary = () => {
  const catchData = useCatch()

  switch (catchData.status) {
    case 401:
      return (
        <Document title='Not Authorised'>
          <RootBoundaryContainer>
            <Title>You are not authorised to be here!</Title>
          </RootBoundaryContainer>
        </Document>
      )
    case 404:
      return (
        <Document title='Uh-Oh!'>
          <FourOhFour
            actionText='Create new User'
            title='Cannot find what you are looking for'
          />
        </Document>
      )
  }

  return (
    <Document title={catchData.statusText}>
      <RootBoundaryContainer>
        <Title>{catchData.statusText}</Title>
      </RootBoundaryContainer>
    </Document>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <Document title='Snap!'>
      <RootBoundaryContainer>
        <Title>App Error</Title>
        {error.message}
      </RootBoundaryContainer>
    </Document>
  )
}
