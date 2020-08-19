import * as API from '../api/types';
import {getAuth} from '../auth/auth';
import fetch from 'node-fetch';
import URL from 'url';

type Match<T, S extends API.APIKey> =
  T extends API.API<infer U, infer UP, infer M, infer P, infer R> ?
  S extends "uri" ? U :
  S extends "uriParams" ? UP :
  S extends "method" ? M :
  S extends "param" ? P :
  S extends "response" ? R : never : never;

function mkHeader(extra: any = {}) { // throw
  return {
    "Authorization": `Bearer ${getAuth().token}`,
    ...extra
  }
}

export async function canvas<T>(props: {
  uri: Match<T, "uri">,
  method: Match<T, "method">,
  uriParams?: Match<T, "uriParams">,
  param: Match<T, "param">,
  extraHeaders?: any,
}): Promise<Match<T, "response">> {
  const {method, uriParams, param, extraHeaders} = props;
  const uri = uriParamsReplace(props.uri, uriParams ?? []);
  const headers = mkHeader(extraHeaders);

  const [url, config] = ((): [string, any] => {
    const base = getAuth().url;
    const url = URL.resolve(base, uri);

    switch (method) {
      case "GET": {
        const hostname = base.split("https://").pop();
        const url = URL.format({
          protocol: "https",
          hostname,
          pathname: uri,
          query: param as any,
        });

        return [url, {headers}];
      }

      case "POST": {
        return [url, {
          method: "post",
          body: JSON.stringify(param),
          headers,
        }];
      }

      case "DELETE": {
        return [url, {
          method: "delete",
          headers,
        }];
      }

      case "PUT":
        return [url, {
          method: "put",
          body: JSON.stringify(param),
          headers,
        }];

      default:
        throw new Error(`Wrong HTTP method ${method}`);
    }
  })();

  return (await fetch(url, config)).json();
}


function uriParamsReplace(uri: string, uriParams: (number | string)[]) {
  return uri.split("/").map(e => {
    if (e.startsWith(":") && uriParams.length >= 0) {
      const val = uriParams.shift()?.toString();
      if (val !== undefined) {
        return val;
      }
      throw new Error(""
        + `Uri parameter is not matched with the api endpoint. ${uri}, `
        + `no parameter corresponds to ${e}.`);
    }
  }).join("/");
}
