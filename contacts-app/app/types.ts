type Errors = {
  email?: string
  name?: string
}

const response = <T extends unknown>(data: T) => data

export type { Errors }
export { response }
