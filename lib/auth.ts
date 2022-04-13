import { setCookies, getCookie, removeCookies } from 'cookies-next';
import type { IMovie, IUser, IUserDetails, ICookieParams, IRequestOptions } from '../interfaces';

// 14 days in seconds
const maxAge = 60 * 60 * 24 * 14;

const fetcher = async (url: string, options: IRequestOptions, errorMessage: string) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error(errorMessage);

    const data = await res.json();

    return data;
  } catch (e) {
    throw new Error(e);
  }
};

class AuthApi {
  private static url = 'https://api.themoviedb.org';

  private static openTabWithUrl = (url: string) => {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.style.display = 'none';
    link.href = url;
    link.target = '_blank';
    link.click();
    document.body.removeChild(link);
  };

  private static getRequestToken = async () => {
    const { request_token: reqToken } = await fetcher(
      `${AuthApi.url}/4/auth/request_token`,
      {
        method: 'post',
        headers: { 'Content-type': 'application/json;charset=utf-8', Authorization: `Bearer ${process.env.apiV4Key}` },
      },
      'Unable to get request token'
    );

    AuthApi.openTabWithUrl(`https://www.themoviedb.org/auth/access?request_token=${reqToken}`);

    return reqToken;
  };

  private static getAccessToken = async (reqToken: string) => {
    const { access_token: accessToken, account_id: accountId } = await fetcher(
      `${AuthApi.url}/4/auth/access_token`,
      {
        method: 'post',
        body: JSON.stringify({ request_token: reqToken }),
        headers: { 'Content-type': 'application/json;charset=utf-8', Authorization: `Bearer ${process.env.apiV4Key}` },
      },
      'Unable to get access token'
    );

    return { accessToken, accountId };
  };

  private static getSessionId = async (accessToken: string) => {
    const { session_id: sessionId } = await fetcher(
      `${AuthApi.url}/3/authentication/session/convert/4?api_key=${process.env.apiKey}`,
      {
        method: 'post',
        body: JSON.stringify({ access_token: accessToken }),
        headers: { 'Content-type': 'application/json;charset=utf-8' },
      },
      'Unable to get session id'
    );

    return sessionId;
  };

  static authenticateUser = async () => {
    try {
      const reqToken = await AuthApi.getRequestToken();

      alert('Confirm authentication');

      const { accessToken, accountId } = await AuthApi.getAccessToken(reqToken);

      const sessionId = await AuthApi.getSessionId(accessToken);

      const user = { accessToken, accountId, sessionId } as IUser;

      const userString = JSON.stringify(user);

      setCookies('user', userString, { maxAge });

      return user;
    } catch (e) {
      console.error(e);
    }
  };

  static getUserDetails = async (id: string) => {
    try {
      const { id: userId, username } = await fetcher(
        `${AuthApi.url}/3/account?api_key=${process.env.apiKey}&session_id=${id}`,
        { method: 'get' },
        'Unable to get user details'
      );

      return { userId, username } as IUserDetails;
    } catch (e) {
      throw new Error(e);
    }
  };

  static getFavouriteMovies = async (accountId: number, sessionId: string) => {
    try {
      const { results } = await fetcher(
        `${AuthApi.url}/3/account/${accountId}/favorite/movies?api_key=${process.env.apiKey}&session_id=${sessionId}`,
        {
          method: 'get',
        },
        'Unable to get favourite movies'
      );

      return results as IMovie[];
    } catch (e) {
      throw new Error(e);
    }
  };

  static toggleFavouriteMovie = async ({ id, favorite, userId, sessionId }: { id: number; favorite: boolean; userId: number; sessionId: string }) => {
    try {
      await fetcher(
        `${AuthApi.url}/3/account/${userId}/favorite?api_key=${process.env.apiKey}&session_id=${sessionId}`,
        {
          method: 'post',
          body: JSON.stringify({ media_type: 'movie', media_id: id, favorite }),
          headers: { 'Content-type': 'application/json;charset=utf-8' },
        },
        'Unable to send request'
      );
    } catch (e) {
      console.error(e);
    }
  };

  static getUserFromCookies = (params?: ICookieParams) => {
    const userCookie = getCookie('user', params);

    if (!userCookie) throw new Error('Unable to read cookies');

    const user = JSON.parse(userCookie as string) as IUser;

    return user;
  };

  static signOutUser = async () => {
    try {
      const { accessToken, sessionId } = AuthApi.getUserFromCookies();

      await fetcher(
        `${AuthApi.url}/3/authentication/session?api_key=${process.env.apiKey}`,
        {
          method: 'delete',
          headers: { 'Content-type': 'application/json;charset=utf-8' },
          body: JSON.stringify({ session_id: sessionId }),
        },
        'Unable to log out from service v4'
      );

      await fetcher(
        `${AuthApi.url}/4/auth/access_token`,
        {
          method: 'delete',
          headers: { 'Content-type': 'application/json;charset=utf-8', Authorization: `Bearer ${process.env.apiV4Key}` },
          body: JSON.stringify({ access_token: accessToken }),
        },
        'Unable to log out from service v4'
      );

      removeCookies('user');
    } catch (e) {
      console.error(e);
    }
  };
}

export default AuthApi;
