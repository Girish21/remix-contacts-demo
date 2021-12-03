import * as React from 'react'
import clsx from 'clsx'

type Never = Record<string, unknown>
type PageCenterContainerProps = {
  variant?: 'large' | 'medium' | 'small'
}

const Card: React.FunctionComponent<Never> = ({ children }) => {
  const childrens = React.Children.toArray(children)

  return (
    <li className='container__list__element container__flex--gap-6'>
      {childrens[0]}
      <div className='container__flex container__flex--column'>
        {childrens[1]}
        {childrens[2]}
      </div>
    </li>
  )
}

const Emphasis: React.FunctionComponent<Never> = ({ children }) => {
  return <em>{children}</em>
}

const Image = ({ src }: { src: string }) => {
  return <img className='container__flex--self-center' src={src} alt='' />
}

const List: React.FunctionComponent<Never> = ({ children }) => {
  return <ul children={children} />
}

const MainSection: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <section
      className='h-full container__flex container__flex__space--equal container__flex--gap-6'
      children={children}
    />
  )
}

const MessageContainer: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <section
      className='foreground container__banner container__flex container__flex--column container__flex--gap-4'
      children={children}
    />
  )
}

const PageCenterContainer: React.FunctionComponent<PageCenterContainerProps> =
  ({ children, variant = 'medium' }) => {
    return (
      <main
        className={clsx(
          'container container__flex container__flex--column container__flex--center',
          variant === 'medium' && 'container--medium',
          variant === 'small' && 'container--small'
        )}
        children={children}
      />
    )
  }

const PageContainer: React.FunctionComponent<Never> = ({ children }) => {
  return <main className='container' children={children} />
}

const FullWidthContainer: React.FunctionComponent<Never> = ({ children }) => {
  return <div className='relative w-full' children={children} />
}

const SecondaryTitle: React.FunctionComponent<Never> = ({ children }) => {
  return <h3 className='heading--md' children={children} />
}

const SectionHeader: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <div
      className='container__flex container__flex--align-center container__flex--justify-between'
      children={children}
    />
  )
}

const Title: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <h2
      className='heading--2xl container__flex--self-center'
      children={children}
    />
  )
}

const UsersPage: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <PageContainer>
      <MainSection>{children}</MainSection>
    </PageContainer>
  )
}

const UserEditSection: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <div className='container__flex container__flex--column container__flex--center'>
      <div className='container__fixed'>
        <div className='fixed__wrapper'>{children}</div>
      </div>
    </div>
  )
}

const UsersSection: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <div
      className='container__center container__flex container__flex--column container__flex--gap-2'
      children={children}
    />
  )
}

export {
  Card,
  Emphasis,
  Image,
  List,
  MainSection,
  MessageContainer,
  PageCenterContainer,
  PageContainer,
  FullWidthContainer,
  SecondaryTitle,
  SectionHeader,
  Title,
  UsersPage,
  UserEditSection,
  UsersSection,
}
