import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import UserWidget from './UserWidget/UserWidget';
import Navigation from './Layout.styles';
import CustomLink from './CustomLink/CustomLink';
import useAuth from '../../hooks/useAuth';

type Props = {
  children: ReactNode;
};

const linksArray = [
  { href: '/', title: 'Home page' },
  { href: '/movies', title: 'Movies' },
];

const Layout = ({ children }: Props) => {
  const { authenticatedUser, handleAuthenticateUser, handleSignOut } = useAuth();

  const { pathname } = useRouter();

  const links = linksArray.map(({ href, title }) => <CustomLink key={title} href={href} title={title} active={href === pathname} />);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"></link>
      </Head>
      <Navigation>
        <h1>Netflix Picker</h1>
        <ul>{links}</ul>
        {authenticatedUser ? (
          <UserWidget name={authenticatedUser.username} handleSignOut={handleSignOut} />
        ) : (
          <button onClick={handleAuthenticateUser}>Sign in</button>
        )}
      </Navigation>
      {children}
    </>
  );
};

export default Layout;
