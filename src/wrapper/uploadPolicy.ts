import * as File from './file';
import {mkHeader} from '../request/requestBuidler';
import FormData from 'form-data';
import * as P from '../api/fileUploadViaPostTypes';
import * as F from '../api/filesAPITypes';
import {Match} from '../request/requestBuidler';
import fetch from 'node-fetch';
import {isValidURL} from '../utils';
import {URLString} from '../api/aliases';


/**
 * upload a file to canvas.
 * This function implement the entire process of canvas upload policy.
 * @param folderId the folder id.
 * @param file the binary representation of the file.
 * @param config config for "/api/v1/folders/:folder_id/files" endpoint.
 * @return a Promise of confirmed response from canvas server.
 */

export async function uploadAFile(
  folderId: Match<F.UploadAFile, "uriParams">["folder_id"],
  fileContent: ArrayBuffer,
  config: Match<F.UploadAFile, "param">
) {
  const {upload_url, upload_params} = await File.uploadAFileENDPOINT(folderId, config);
  const confirmUrl = await fileUploadViaPost(upload_url, {
    file: fileContent,
    key: upload_params.key,
  });

  const confirmedMsg = await fileUploadConfirm(confirmUrl);
  return confirmedMsg;
}


/**
 * post bianry value
 * @param url where we post our data to. It's a url string received from
 *        UploadAFileENDPOINT endpoint request.
 * @param config contains key get from UploadAFileENDPOINT request and
 *        binary file content.
 *        note the file is mandatory.
 * @return confirm url
 */

export async function fileUploadViaPost(
  url: URLString,
  config: Match<P.Upload, "param">,
): Promise<Match<P.Upload, "response">> {
  if (!isValidURL(url)) {
    throw new Error(""
      + `Problem with ${url} when performing canvas file upload policy.\n`
      + "More information please check canvas lms api website");
  }

  const form = new FormData();
  if (typeof config.key === "string") {
    form.append('key', config.key);
  }
  form.append('file', config.file);

  return (await fetch(url, {
    method: "post",
    body: form,
    headers: {...mkHeader()}
  })).json();
}


/**
 * confirm data is uploaded
 * @param url the url string returned from `fileUploadViaPost`. The url is
 *        used to confirm if file is uploaded.
 *        Note, if the previous response has status 3xx this confirmation is
 *        necessary for file to be stored.
 * @return confirmed message
 */
export async function fileUploadConfirm(
  url: URLString,
): Promise<Match<P.Confirm, "response">> {
  if (!isValidURL(url)) {
    throw new Error(""
      + `Problem with ${url} when confirming canvas file upload.\n`
      + "More information please check canvas lms api website");
  }

  return (await fetch(url, {
    method: 'post',
    headers: {
      ...mkHeader(),
      "Content-Length": 0,
    }
  })).json();
}
