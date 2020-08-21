import {HTTPMethod} from '../request/types';

export interface API<
  U extends string,
  UP extends {[key: string]: number | string},
  M extends HTTPMethod,
  P,
  R> {
  // api endpoint
  uri: U,

  // exists only when the endpoint requires parameters.
  uriParams?: UP,

  // HTTP method
  method: M,

  // parameters for GET, or body for POST
  param: P,

  // response type.
  response: R,
};

export type APIKey =
  | "uri"
  | "uriParams"
  | "method"
  | "param"
  | "response";
