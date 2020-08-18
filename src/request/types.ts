export type HTTPMethod =
  | "GET"
  | "POST"
  | "DELETE"
  | "PUT"
  ;
export type URL = string;

export interface HTTPHeader {
  Authorization: string,
}

export interface Request {
  method: HTTPMethod,
  uri: URL,
  json: boolean,
  resolveWithFullResponse: boolean,
  headers: HTTPHeader,
}

export interface GETRequest extends Request {
  method: "GET",
}

export interface DELETERequest extends Request {
  method: "DELETE",
  form: string,
}

export interface PUTRequest extends Request {
  method: "PUT",
  form: string,
}

