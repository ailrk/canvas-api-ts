import {API} from './types';
import {
  MIMETypeString,
  URLString,
} from './aliases';

// Canvas fild upload procedure
// First use canvas api to get upload url,
// then post the file to the given url.
// To check if the file is uploaded, use the `Location` entry returned
// from the second request.
// https://canvas.instructure.com/doc/api/file.file_uploads.html
export type Upload = API<
  // uplaod_url
  URLString,
  {},
  "POST",
  {file: ArrayBuffer} &
  Partial<{
    key: string,
  }> & any,

  // sample respnse:
  // HTTP/1.1 301 Moved Permanently
  // Location: https://<canvas>/api/v1/files/1234/create_success?uuid=ABCDE
  string>;

export type Confirm = API<
  // Location
  URLString,
  {},
  "POST",
  {},
  {
    id: number,
    url: URLString,
    "content-type": MIMETypeString,
    display_name: string,
    szie: number,
  }>;

export declare namespace FileUploadViaURL {
  // TODO
}
