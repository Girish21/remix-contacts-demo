import * as React from 'react'

const useFocus = <T extends HTMLElement>() => {
  const focusRef = React.useRef<T | null>(null)

  React.useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, [])

  return focusRef
}

export default useFocus
