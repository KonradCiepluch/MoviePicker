import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export type Articles = Record<string, string>[];

export interface IUser {
  accessToken: string;
  accountId: string;
  sessionId: string;
}

export interface IUserDetails {
  userId: number;
  username: string;
}

export interface IMovie {
  id: number;
  title: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface ICookieParams {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
  res: ServerResponse;
}

type HttpMethods = 'get' | 'post' | 'put' | 'delete';

export interface IRequestOptions {
  method: HttpMethods;
  body?: BodyInit;
  headers?: HeadersInit;
}
