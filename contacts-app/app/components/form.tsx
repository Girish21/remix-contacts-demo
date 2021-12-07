import type * as React from 'react'

type Never = Record<string, unknown>

type AvatarProps = {
  iconUrl: string
}

const Avatar = ({ iconUrl }: AvatarProps) => {
  return (
    <div className='container__img__wrapper'>
      <img height='64px' width='64px' src={iconUrl} />
    </div>
  )
}

const Error: React.FunctionComponent<Never> = ({ children }) => {
  return <p>{children}</p>
}

const FieldSet: React.FunctionComponent<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
> = (props) => {
  return (
    <fieldset
      className='container__form__wrapper container__flex container__flex--column container__flex--gap-6'
      {...props}
    />
  )
}

const Field: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <div
      className='container__flex container__flex--column container__flex--gap-2'
      children={children}
    />
  )
}

const Section: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <section className='foreground container__banner' children={children} />
  )
}

export { Avatar, Error, Field, FieldSet, Section }
