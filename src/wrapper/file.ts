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

export function getCourseFileQuota(
  courseId: Match<F.Quota.GetCourseQuota, "uriParams">["course_id"],
) {
  return canvas<F.Quota.GetCourseQuota>({
    uri: "/api/v1/courses/:course_id/files/quota",
    uriParams: {course_id: courseId},
    method: "GET",
    param: {}
  })
}

export function getGroupFileQuota(
  groupId: Match<F.Quota.GetGroupQuota, "uriParams">["group_id"],
) {
  return canvas<F.Quota.GetGroupQuota>({
    uri: "/api/v1/groups/:group_id/files/quota",
    uriParams: {group_id: groupId},
    method: "GET",
    param: {}
  })
}

export function getUserFileQuota(
  userId?: Match<F.Quota.GetUserQuota, "uriParams">["user_id"],
) {
  return canvas<F.Quota.GetUserQuota>({
    uri: "/api/v1/users/:user_id/files/quota",
    uriParams: {user_id: userId ?? "self"},
    method: "GET",
    param: {},
  })
}

export const getQuota = getUserFileQuota;


export function getCourseFiles(
  courseId: Match<F.List.GetCourseList, "uriParams">["course_id"],
  config: Match<F.List.GetCourseList, "param">,
) {
  return canvas<F.List.GetCourseList>({
    uri: "/api/v1/courses/:course_id/files",
    uriParams: {course_id: courseId},
    method: "GET",
    param: config,
  });
}

export function getUserFiles(
  userId: Match<F.List.GetUserList, "uriParams">["user_id"],
  config: Match<F.List.GetUserList, "param">,
) {
  return canvas<F.List.GetUserList>({
    uri: "/api/v1/users/:user_id/files",
    uriParams: {user_id: userId},
    method: "GET",
    param: config,
  });
}

export const getFiles =
  (config: Match<F.List.GetUserList, "param">) => getUserFiles("self", config)

export function getGroupFiles(
  groupId: Match<F.List.GetGroupList, "uriParams">["group_id"],
  config: Match<F.List.GetGroupList, "param">,
) {
  return canvas<F.List.GetGroupList>({
    uri: "/api/v1/groups/:group_id/files",
    uriParams: {group_id: groupId},
    method: "GET",
    param: config,
  });
}

export function getFolderFiles(
  id: Match<F.List.GetFolderList, "uriParams">["id"],
  config: Match<F.List.GetFolderList, "param">,
) {
  return canvas<F.List.GetFolderList>({
    uri: "/api/v1/folders/:id/files",
    uriParams: {id},
    method: "GET",
    param: config,
  });
}

export function updateFile(
  id: Match<F.UpateFile, "uriParams">["id"],
  config: Match<F.UpateFile, "param">,
) {
  return canvas<F.UpateFile>({
    uri: "/api/v1/files/:id",
    uriParams: {id},
    method: "PUT",
    param: config,
  })
}
