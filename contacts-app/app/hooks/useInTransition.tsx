import { useTransition } from 'remix'

const useInTransition = () => {
  const transition = useTransition()

  return transition.state === 'submitting' || transition.state === 'loading'
}

export default useInTransition
