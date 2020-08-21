import {HTTPMethod} from '../request/types';
export * as RoleAPITypes from './roleAPITypes';
export * as FilesAPITypes from './filesAPITypes';
export * as UserTypes from './userTypes';
export * as CourseAPITypes from './courseAPITypes';
export * as ConversationAPITypes from './conversationAPITypes';
export * as SearchAPITypes from './searchAPITypes';
export * as AccountAPITypes from './accountAPITypes';
export * as PermissionTypes from './permissionTypes';
export * as ProgreassAPITypes from './progreassAPITypes';
export * as AssignmentAPITypes from './assignmentAPITypes';
export * as FileUploadViaPostTypes from './fileUploadViaPostTypes';
export * as AnnouncementAPITypes from './announcementAPITypes';


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
