import {API} from './types';
import * as ResponseType from './responseTypes';
import {
  DateString,
  MIMETypeString,
  URLString,
} from './aliases';


// API for files
// https://canvas.instructure.com/doc/api/files.html
export declare namespace Quota {
  export type GetCourseQuota = API<
    "/api/v1/courses/:course_id/files/quota",
    {course_id: number},
    "GET",
    {},
    {quota: number, quota_used: number}>;

  export type GetGroupQuota = API<
    "/api/v1/groups/:group_id/files/quota",
    {group_id: number},
    "GET",
    {},
    {quota: number, quota_used: number}>;

  export type GetUserQuota = API<
    "/api/v1/users/:user_id/files/quota",
    {user_id: number | "self"},
    "GET",
    {},
    {quota: number, quota_used: number}>;
}

export declare namespace List {
  type ListParam = {
    content_type: MIMETypeString[],
    exclude_content_types: MIMETypeString[],
    search_term: string,
    include: ("user" | "usage_rights")[],
    only: ("names")[],
    sort:
    | "name"
    | "size"
    | "created_at"
    | "updated_at"
    | "content_type"
    | "user",
    order: "asc" | "desc",
  };

  export type Course = API<
    "/api/v1/courses/:course_id/files",
    {course_id: number},
    "GET",
    Partial<ListParam>,
    ResponseType.File[]>;

  export type User = API<
    "/api/v1/users/:user_id/files",
    {user_id: number | "self"},
    "GET",
    Partial<ListParam>,
    ResponseType.File[]>;

  export type Group = API<
    "/api/v1/groups/:group_id/files",
    {group_id: number},
    "GET",
    Partial<ListParam>,
    ResponseType.File[]>;

  export type Folder = API<
    "/api/v1/folders/:id/files",
    {id: number},
    "GET",
    Partial<ListParam>,
    ResponseType.File[]>;
}

export declare namespace GetFile {
  export type GetFile = API<
    "/api/v1/files/:id",
    {id: number},
    "GET",
    Partial<{include: ("user" | "usage_rights")[]}>,
    ResponseType.File>;

  export type GetFilePost = API<
    "/api/v1/files/:id",
    {id: number},
    "POST",
    Partial<{include: ("user" | "usage_rights")[]}>,
    ResponseType.File>;

  export type GetCourseFile = API<
    "/api/v1/courses/:course_id/files/:id",
    {course_id: number, id: number},
    "GET",
    Partial<{include: ("user" | "usage_rights")[]}>,
    ResponseType.File>;

  export type GetGroupFile = API<
    "/api/v1/groups/:group_id/files/:id",
    {group_id: number, id: number},
    "GET",
    Partial<{include: ("user" | "usage_rights")[]}>,
    ResponseType.File>;

  export type GetUserFile = API<
    "/api/v1/users/:user_id/files/:id",
    {user_id: number | "self", id: number},
    "GET",
    Partial<{include: ("user" | "usage_rights")[]}>,
    ResponseType.File>;
}

export type UpateFile = API<
  "/api/v1/files/:id",
  {id: number},
  "PUT",
  Partial<{
    name: string,
    parent_folder_id: string,
    on_duplicate: "overwrite" | " rename",
    lock_at: DateString,
    unlock_at: DateString,
    locked: boolean,
    hidden: boolean,
  }>,
  ResponseType.File>;

export type DeleteFile = API<
  "/api/v1/files/:id",
  {id: number},
  "DELETE",
  Partial<{replace: boolean}>,
  ResponseType.File>;

export type ResetLinkVerifier = API<
  "/api/v1/files/:id/reset_verifier",
  {id: number},
  "POST",
  {},
  ResponseType.File>;

export type ListFolders = API<
  "/api/v1/folders/:id/folders",
  {id: number},
  "GET",
  {},
  ResponseType.Folder[]>;

export declare namespace ListAllFolders {
  export type ListCourseFolders = API<
    "/api/v1/courses/:course_id/folders",
    {course_id: number},
    "GET",
    {},
    ResponseType.Folder[]>;

  export type ListUserFolders = API<
    "/api/v1/users/:user_id/folders",
    {user_id: number | "self"},
    "GET",
    {},
    ResponseType.Folder[]>;

  export type ListGroupFolders = API<
    "/api/v1/groups/:group_id/folders",
    {group_id: number},
    "GET",
    {},
    ResponseType.Folder[]>;
}

export declare namespace ResolvePath {
  export type Course = API<
    "/api/v1/courses/:course_id/folders/by_path/*full_path",
    {course_id: number, full_path: string | ""},
    "GET",
    {},
    ResponseType.Folder[]>;

  export type User = API<
    "/api/v1/users/:user_id/folders/by_path/*full_path",
    {user_id: number | "self", full_path: string | ""},
    "GET",
    {},
    ResponseType.Folder[]>;

  export type Group = API<
    "/api/v1/groups/:group_id/folders/by_path/*full_path",
    {group_id: number, full_path: string},
    "GET",
    {},
    ResponseType.Folder[]>;
}

export declare namespace GetFolder {
  export type Course = API<
    "/api/v1/courses/:course_id/folders/:id",
    {course_id: number, id: string},
    "GET",
    {},
    ResponseType.Folder>;

  export type User = API<
    "/api/v1/users/:user_id/folders/:id",
    {user_id: number | "self", id: number},
    "GET",
    {},
    ResponseType.Folder>;

  export type Group = API<
    "/api/v1/groups/:group_id/folders/:id",
    {group_id: number, id: number},
    "GET",
    {},
    ResponseType.Folder>;

  export type Folder = API<
    "/api/v1/folders/:id",
    {id: number},
    "GET",
    {},
    ResponseType.Folder>;
}

export type UpdateFoler = API<
  "/api/v1/folders/:id",
  {id: number},
  "PUT",
  Partial<{
    name: string,
    parent_folder_id: string,
    lock_at: DateString,
    unlock_at: DateString,
    locked: boolean,
    hidden: boolean,
    position: boolean,
  }>,
  ResponseType.Folder>;

export declare namespace CreateFoler {
  type CreateFolerParam = {
    name: string,
  } & Partial<{
    parent_folder_id: string,
    parent_folder_path: string,
    lock_at: DateString,
    unlock_at: DateString,
    locked: boolean,
    hidden: boolean,
    position: number,
  }>;

  export type Course = API<
    "/api/v1/courses/:course_id/folders",
    {course_id: number},
    "POST",
    CreateFolerParam,
    ResponseType.Folder>;

  export type User = API<
    "/api/v1/users/:user_id/folders",
    {user_id: number | "self"},
    "POST",
    CreateFolerParam,
    ResponseType.Folder>;

  export type Group = API<
    "/api/v1/groups/:group_id/folders",
    {group_id: number},
    "POST",
    CreateFolerParam,
    ResponseType.Folder>;

  export type Folder = API<
    "/api/v1/folders/:folder_id/folders",
    {folder_id: number},
    "POST",
    CreateFolerParam,
    ResponseType.Folder>;
}

export type DeleteFolder = API<
  "/api/v1/folders/:id",
  {id: number},
  "DELETE",
  Partial<{force: boolean}>,
  ResponseType.Folder>;

export type UploadAFile = API<
  "/api/v1/folders/:folder_id/files",
  {folder_id: number},
  "POST",
  {
    // any utf8 allowed
    name: string,

    // in bytes
    size: number,

    content_type: MIMETypeString,

    // default folder will be used if it is null
    parent_folder_id?: number,

    on_duplicate: "overwrite" | " rename",

    success_include: ("user" | "usage_rights")[],
  },
  {
    upload_url: URLString,

    upload_params: {

      key?: string,

      [unspecified: string]: any,
    }
  }>;

export type CopyAFile = API<
  "/api/v1/folders/:dest_folder_id/copy_file",
  {dest_folder_id: number},
  "POST",
  {
    source_file_id: string
  } & Partial<{on_duplicate: "overwrite" | "rename"}>,
  ResponseType.File>;

export type CopyAFolder = API<
  "/api/v1/folders/:dest_folder_id/copy_folder",
  {dest_folder_id: number},
  "POST",
  {source_file_id: string},
  ResponseType.Folder>;

export declare namespace GetUploadedMediaFolderForUser {
  export type Course = API<
    "/api/v1/courses/:course_id/folders/media",
    {course_id: number},
    "GET",
    {},
    ResponseType.Folder>;

  export type Group = API<
    "/api/v1/groups/:group_id/folders/media",
    {group_id: number},
    "GET",
    {},
    ResponseType.Folder>;
}

export declare namespace SetUsageRights {
  type SetUsageRightsParam = {file_ids: string[]}
    & Partial<{
      folder_ids: string[],
      publish: boolean,
      usage_rights: {
        use_justification: string,
        legal_copyright: string,
        license: string,
      }
    }>;

  export type Course = API<
    "/api/v1/courses/:course_id/usage_rights",
    {course_id: number},
    "PUT",
    SetUsageRightsParam,
    ResponseType.UsageRights>;

  export type Group = API<
    "/api/v1/groups/:group_id/usage_rights",
    {group_id: number},
    "PUT",
    SetUsageRightsParam,
    ResponseType.UsageRights>;

  export type User = API<
    "/api/v1/users/:user_id/usage_rights",
    {user_id: number | "self"},
    "PUT",
    SetUsageRightsParam,
    ResponseType.UsageRights>;
}

export declare namespace RemoveUsageRights {
  type RemoveUsageRightsParam =
    {file_ids: string[]} &
    Partial<{
      folder_ids: string[]
    }>;

  export type User = API<
    "/api/v1/users/:user_id/usage_rights",
    {user_id: number | "self"},
    "DELETE",
    RemoveUsageRightsParam,
    ResponseType.UsageRights>;

  export type Group = API<
    "/api/v1/groups/:group_id/usage_rights",
    {group_id: number},
    "DELETE",
    RemoveUsageRightsParam,
    ResponseType.UsageRights>;

  export type Course = API<
    "/api/v1/courses/:course_id/usage_rights",
    {course_id: number},
    "DELETE",
    RemoveUsageRightsParam,
    ResponseType.UsageRights>;
}
