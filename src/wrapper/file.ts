import {FilesAPI as F} from '../api/types';
import {canvas, Match} from '../request/requestBuidler';

export async function getFile(
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

export async function getCourseFileQuota(
  courseId: Match<F.Quota.GetCourseQuota, "uriParams">["course_id"],
) {
  return canvas<F.Quota.GetCourseQuota>({
    uri: "/api/v1/courses/:course_id/files/quota",
    uriParams: {course_id: courseId},
    method: "GET",
    param: {}
  })
}

export async function getGroupFileQuota(
  groupId: Match<F.Quota.GetGroupQuota, "uriParams">["group_id"],
) {
  return canvas<F.Quota.GetGroupQuota>({
    uri: "/api/v1/groups/:group_id/files/quota",
    uriParams: {group_id: groupId},
    method: "GET",
    param: {}
  })
}

export async function getUserFileQuota(
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

export async function getCourseFiles(
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

export async function getUserFiles(
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

export async function getGroupFiles(
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

export async function getFolderFiles(
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

export async function updateFile(
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

export async function deletFile(
  id: Match<F.DeleteFile, "uriParams">["id"],
  config: Match<F.DeleteFile, "param">,
) {
  return canvas<F.DeleteFile>({
    uri: "/api/v1/files/:id",
    uriParams: {id},
    method: "DELETE",
    param: config,
  })
}


export async function getCourseFolders(
  courseId: Match<F.ListAllFolders.ListCourseFolders, "uriParams">["course_id"],
) {
  return canvas<F.ListAllFolders.ListCourseFolders>({
    uri: "/api/v1/courses/:course_id/folders",
    uriParams: {course_id: courseId},
    method: "GET",
    param: {},
  })
}

export async function getUserFolders(
  userId?: Match<F.ListAllFolders.ListUserFolders, "uriParams">["user_id"],
) {
  return canvas<F.ListAllFolders.ListUserFolders>({
    uri: "/api/v1/users/:user_id/folders",
    uriParams: {user_id: userId ?? "self"},
    method: "GET",
    param: {},
  })
}

export async function getGroupFolders(
  groupId: Match<F.ListAllFolders.ListGroupFolders, "uriParams">["group_id"],
) {
  return canvas<F.ListAllFolders.ListGroupFolders>({
    uri: "/api/v1/groups/:group_id/folders",
    uriParams: {group_id: groupId},
    method: "GET",
    param: {},
  })
}


export async function getCourseFoldersByPath(
  courseId: Match<F.ResolvePath.Course, "uriParams">["course_id"],
  path: string,
) {
  return canvas<F.ResolvePath.Course>({
    uri: "/api/v1/courses/:course_id/folders/by_path/*full_path",
    uriParams: {course_id: courseId, full_path: path},
    method: "GET",
    param: {},
  });
}

export async function getGroupFoldersByPath(
  groupId: Match<F.ResolvePath.Group, "uriParams">["group_id"],
  path: string,
) {
  return canvas<F.ResolvePath.Group>({
    uri: "/api/v1/groups/:group_id/folders/by_path/*full_path",
    uriParams: {group_id: groupId, full_path: path},
    method: "GET",
    param: {},
  });
}

export async function getUserFoldersByPath(
  userId: Match<F.ResolvePath.User, "uriParams">["user_id"],
  path: string,
) {
  return canvas<F.ResolvePath.User>({
    uri: "/api/v1/users/:user_id/folders/by_path/*full_path",
    uriParams: {user_id: userId, full_path: path},
    method: "GET",
    param: {},
  });
}

export async function getCourseFolder(
  courseId: Match<F.GetFoler.Course, "uriParams">["course_id"],
  folderId: Match<F.GetFoler.Course, "uriParams">["id"],
) {
  return canvas<F.GetFoler.Course>({
    uri: "/api/v1/courses/:course_id/folders/:id",
    uriParams: {course_id: courseId, id: folderId},
    method: "GET",
    param: {},
  });
}

export async function getUserFolder(
  userId: Match<F.GetFoler.User, "uriParams">["user_id"],
  folderId: Match<F.GetFoler.User, "uriParams">["id"],
) {
  return canvas<F.GetFoler.User>({
    uri: "/api/v1/users/:user_id/folders/:id",
    uriParams: {user_id: userId, id: folderId},
    method: "GET",
    param: {},
  });
}

export async function getGroupFolder(
  groupId: Match<F.GetFoler.Group, "uriParams">["group_id"],
  folderId: Match<F.GetFoler.Group, "uriParams">["id"],
) {
  return canvas<F.GetFoler.Group>({
    uri: "/api/v1/groups/:group_id/folders/:id",
    uriParams: {group_id: groupId, id: folderId},
    method: "GET",
    param: {},
  });
}

export async function getFolder(
  folderId: Match<F.GetFoler.Folder, "uriParams">["id"],
) {
  return canvas<F.GetFoler.Folder>({
    uri: "/api/v1/folders/:id",
    uriParams: {id: folderId},
    method: "GET",
    param: {},
  });
}


