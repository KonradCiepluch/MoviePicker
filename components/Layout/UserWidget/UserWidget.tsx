import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import WidgetWrapper from './UserWidget.styles';

type Props = { name: string; handleSignOut: () => void };

const UserWidget = ({ name, handleSignOut }: Props) => {
  const { pathname } = useRouter();

  if (pathname === '/user') return <button onClick={handleSignOut}>Sign out</button>;

  return (
    <WidgetWrapper>
      <h3>Welcome {name}!</h3>
      <Link href={'/user'}>Go to user site</Link>
    </WidgetWrapper>
  );
};

export default UserWidget;
