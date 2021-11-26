import type { LoaderFunction } from 'remix'
import { redirect } from 'remix'

export const loader: LoaderFunction = () => {
  throw redirect('/users')
}

export default function User() {
  return <h2>User</h2>
}
