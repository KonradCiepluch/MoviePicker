import React, { useLayoutEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { IUserDetails, IMovie } from '../../interfaces';
import PageWrapper from '../../components/UserPage/UserPage.styles';
import AuthApi from '../../lib/auth';
import CustomLink from '../../components/Layout/CustomLink/CustomLink';

type Props = { user: IUserDetails | null; movies: IMovie[] };

const UserPage = ({ user, movies }: Props) => {
  const { push } = useRouter();

  useLayoutEffect(() => {
    if (!user) push('/');
  }, [push, user]);

  const items = movies.map(({ id, title, poster_path }) => <CustomLink key={id} href={`/movies/${id}`} title={title} img={poster_path} />);
  return (
    <PageWrapper>
      <p>User: {user?.username}</p>
      {movies.length ? (
        <>
          <p>Favourite movies:</p>
          <ul>{items}</ul>
        </>
      ) : (
        <p>{`You haven't added any favourite movie yet`}</p>
      )}
    </PageWrapper>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const { sessionId } = AuthApi.getUserFromCookies({ req, res });

    const userDetails = await AuthApi.getUserDetails(sessionId);

    const movies = await AuthApi.getFavouriteMovies(userDetails.userId, sessionId);

    return { props: { user: userDetails, movies } };
  } catch (e) {
    return { props: { user: null, movies: [] as IMovie[] } };
  }
};
