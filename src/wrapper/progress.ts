import * as P from '../api/progreassAPITypes';
import {canvas, Match} from '../request/requestBuidler';


export async function getProgress(
  id: Match<P.Progress, "uriParams">["id"]) {
  return canvas<P.Progress>({
    uri: "/api/v1/progress/:id",
    uriParams: {id},
    method: "GET",
    param: {}
  });
}
