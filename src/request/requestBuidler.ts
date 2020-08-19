import * as API from '../api/types';
import axios from 'axios';

type Match<T, S extends API.APIKey> = T extends API.API<infer U, infer M, infer P, infer R> ?
  S extends "url" ? U :
  S extends "method" ? M :
  S extends "param" ? P :
  S extends "response" ? R : never : never;

export async function canvas<T>(props: {
  url: Match<T, "url">,
  method: Match<T, "method">,
  params: Match<T, "param">,
}): Promise<Match<T, "response">> {
  const {url, method, params} = props;
  // TODO give it the correct method call
  switch (method) {
    case "GET":
      return axios.get(url, {params});
    case "POST":
      return axios.get(url, {params});
    case "DELETE":
      return axios.get(url, {params});
    case "PUT":
      return axios.get(url, {params});
    default:
      throw new Error(`Wrong HTTP method ${method}`);
  }
}
