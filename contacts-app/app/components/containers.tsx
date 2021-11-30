import * as React from 'react'

type Never = Record<string, unknown>

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

const SectionHeader: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <div
      className='container__flex container__flex--align-baseline container__flex--justify-between'
      children={children}
    />
  )
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

const PageCenterContainer: React.FunctionComponent<Never> = ({ children }) => {
  return (
    <main
      className='container container--small container__flex container__flex--column container__flex--center'
      children={children}
    />
  )
}

const PageContainer: React.FunctionComponent<Never> = ({ children }) => {
  return <main className='container' children={children} />
}

const SecondaryTitle: React.FunctionComponent<Never> = ({ children }) => {
  return <h3 className='heading--md' children={children} />
}

const Title: React.FunctionComponent<Never> = ({ children }) => {
  return <h2 className='heading--2xl' children={children} />
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
  return <div className='container__center' children={children} />
}

export {
  Card,
  Emphasis,
  Image,
  List,
  MainSection,
  PageCenterContainer,
  PageContainer,
  SecondaryTitle,
  SectionHeader,
  Title,
  UsersPage,
  UserEditSection,
  UsersSection,
}
