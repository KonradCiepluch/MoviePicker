import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import AuthApi from '../lib/auth';
import type { IUserDetails } from '../interfaces';

const useAuth = () => {
  const { push } = useRouter();

  const [authenticatedUser, setAuthenticatedUser] = useState<IUserDetails>(null);

  const getUserFromCookies = useCallback(async () => {
    try {
      const { sessionId } = AuthApi.getUserFromCookies();

      const userDetails = await AuthApi.getUserDetails(sessionId);
      setAuthenticatedUser(userDetails);
    } catch (e) {
      return;
    }
  }, []);

  useEffect(() => {
    getUserFromCookies();
  }, [getUserFromCookies]);

  const handleAuthenticateUser = async () => {
    try {
      const { sessionId } = await AuthApi.authenticateUser();
      const userDetails = await AuthApi.getUserDetails(sessionId);
      setAuthenticatedUser(userDetails);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = () => {
    AuthApi.signOutUser();
    setAuthenticatedUser(null);
    push('/');
  };

  return { authenticatedUser, handleAuthenticateUser, handleSignOut };
};

export default useAuth;
