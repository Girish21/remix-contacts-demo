import { LinksFunction, Scripts } from 'remix'
import { LiveReload, Links, Outlet, Meta, useCatch } from 'remix'

import globalStyles from '~/styles/global.css'
import darkStyles from '~/styles/dark.css'
import fontStyles from '~/styles/font.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: fontStyles },
    { rel: 'stylesheet', href: globalStyles },
    {
      rel: 'stylesheet',
      href: darkStyles,
      media: '(prefers-color-scheme: dark)',
    },
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
        <Scripts />
      </body>
    </html>
  )
}

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
          <h1>You are not authorised to be here!</h1>
        </Document>
      )
    case 404:
      return (
        <Document title='Uh-Oh!'>
          <h1>Cannot find what you are looking for</h1>
        </Document>
      )
  }

  return (
    <Document title={catchData.statusText}>
      <h1>{catchData.statusText}</h1>
    </Document>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <>
      <h1>App Error</h1>
      {error.message}
    </>
  )
}
