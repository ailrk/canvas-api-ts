import {Progress as P} from '../api/types';
import {canvas, Match} from '../request/requestBuidler';

export async function getProgress(
  id: Match<P.Query, "uriParams">["id"]
) {
  return canvas<P.Query>({
    uri: "/api/v1/progress/:id",
    uriParams: {id},
    method: "GET",
    param: {}
  });
}

