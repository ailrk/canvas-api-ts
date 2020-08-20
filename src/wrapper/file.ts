import {FilesAPI as F} from '../api/types';
import {canvas, Match} from '../request/requestBuidler';

export function getFile(
  fileId: Match<F.GetFile.GetFile, "uriParams">["id"],
  include: Match<F.GetFile.GetFile, "param">["include"]
) {
  return canvas<F.GetFile.GetFile>({
    uri: "/api/v1/files/:id",
    uriParams: {id: fileId},
    method: "GET",
    param: {include}
  })
}
