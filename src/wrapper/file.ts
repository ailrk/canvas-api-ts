import * as F from '../api/filesAPITypes';
import {canvas, Match, mkHeader} from '../request/requestBuidler';
import * as ResponseType from '../api/responseTypes';
import {isValidURL} from '../utils';
import fetch from 'node-fetch';
import fs from 'fs';
import {pipeline} from 'stream';
import path from 'path';
import {promisify} from 'util';

const streamPipeline = promisify(pipeline);

// Note, `File` is just a object that stores some information about
// the actual file. To download the file you need to use the url contained
// in `File` object
interface FileStream {

  filename: string,

  // the information of the file provided by canvas server.
  meta: ResponseType.File,

  // the stream body returned from `fetch`
  stream: NodeJS.ReadableStream,

};



/**
 * store one FileStream at the given baseDir.
 * @param baseDir where to download the file to.
 * @param stream the FileStream object generated by one of the file fetching apis.
 * @returns a flag that indicate if file is successfully written.
 */
export async function store(baseDir: string, stream: FileStream) {
  if (!await promisify(fs.exists)(baseDir)) {
    console.log(`${baseDir} doesn't exist, creating a new one`);
    await promisify(fs.mkdir)(baseDir);
  }
  const filepath = path.join(baseDir, stream.filename);
  const wstream = fs.createWriteStream(filepath);
  await streamPipeline(stream.stream, wstream);
}


/**
 * download a single file
 * @param
 * @returns a promise FileStream
 *
 * Note the filename received in `File` object will be url encoded.
 */
export async function fetchFile(
  file: ResponseType.File): Promise<FileStream> {
  const {url, filename} = file;
  const decodedFilename = decodeURIComponent(filename);

  if (!isValidURL(url)) {
    throw new Error(""
      + "file resource url get from canvas api is invalid."
      + " It's a canvas problem");
  }

  const response = await fetch(url, {
    method: 'get',
    headers: {...mkHeader()}
  });

  return {
    filename: decodedFilename,
    meta: file,
    stream: response.body,
  }
}

/**
 * download files from a list of File
 * @param files A list of files that can come from any File[] return apis.
 * @return a promise of a list of binary file and there corresponding File.
 *          File can be used to determine what to do with the binary buffer.
 */
export async function fetchFiles(files: ResponseType.File[]) {
  return files.map(async file => {
    return fetchFile(file)
  });
}

/**
 * download all files from a folder
 * @param folder
 * @return
 */
export async function fetchAllFromAFolder(
  folder: ResponseType.Folder,
  config: Match<F.List.Folder, "param">,) {
  const {id} = folder;
  const files = await getFilesOfAFolder(id, config);
  return fetchFiles(files);
}

export async function getFile(
  fileId: Match<F.GetFile.GetFile, "uriParams">["id"],
  include: Match<F.GetFile.GetFile, "param">["include"]) {
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
  courseId: Match<F.List.Course, "uriParams">["course_id"],
  config: Match<F.List.Course, "param">,
) {
  return canvas<F.List.Course>({
    uri: "/api/v1/courses/:course_id/files",
    uriParams: {course_id: courseId},
    method: "GET",
    param: config,
  });
}

export async function getUserFiles(
  userId: Match<F.List.User, "uriParams">["user_id"],
  config: Match<F.List.User, "param">,
) {
  return canvas<F.List.User>({
    uri: "/api/v1/users/:user_id/files",
    uriParams: {user_id: userId},
    method: "GET",
    param: config,
  });
}

export const getFiles =
  (config: Match<F.List.User, "param">) => getUserFiles("self", config)

export async function getGroupFiles(
  groupId: Match<F.List.Group, "uriParams">["group_id"],
  config: Match<F.List.Group, "param">,
) {
  return canvas<F.List.Group>({
    uri: "/api/v1/groups/:group_id/files",
    uriParams: {group_id: groupId},
    method: "GET",
    param: config,
  });
}

export async function getFilesOfAFolder(
  folderId: Match<F.List.Folder, "uriParams">["id"],
  config: Match<F.List.Folder, "param">,
) {
  return canvas<F.List.Folder>({
    uri: "/api/v1/folders/:id/files",
    uriParams: {id: folderId},
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

export async function getFolderInCourse(
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

export async function getFolderOfUser(
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

export async function getFolderInGroup(
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

export async function updateFolder(
  folderId: Match<F.UpdateFoler, "uriParams">["id"],
  config: Match<F.UpdateFoler, "param">,
) {
  return canvas<F.UpdateFoler>({
    uri: "/api/v1/folders/:id",
    uriParams: {id: folderId},
    method: "PUT",
    param: config,
  })
}


export async function createFolderInCourse(
  courseId: Match<F.CreateFoler.Course, "uriParams">["course_id"],
  config: Match<F.CreateFoler.Course, "param">
) {
  return canvas<F.CreateFoler.Course>({
    uri: "/api/v1/courses/:course_id/folders",
    uriParams: {course_id: courseId},
    method: "POST",
    param: config,
  });
}

export async function createFolderOfUser(
  userId: Match<F.CreateFoler.User, "uriParams">["user_id"],
  config: Match<F.CreateFoler.User, "param">
) {
  return canvas<F.CreateFoler.User>({
    uri: "/api/v1/users/:user_id/folders",
    uriParams: {user_id: userId},
    method: "POST",
    param: config,
  });
}

export async function createFolderInGroup(
  groupId: Match<F.CreateFoler.Group, "uriParams">["group_id"],
  config: Match<F.CreateFoler.Group, "param">
) {
  return canvas<F.CreateFoler.Group>({
    uri: "/api/v1/groups/:group_id/folders",
    uriParams: {group_id: groupId},
    method: "POST",
    param: config,
  });
}

export async function createFolder(
  folderId: Match<F.CreateFoler.Folder, "uriParams">["folder_id"],
  config: Match<F.CreateFoler.Folder, "param">
) {
  return canvas<F.CreateFoler.Folder>({
    uri: "/api/v1/folders/:folder_id/folders",
    uriParams: {folder_id: folderId},
    method: "POST",
    param: config,
  });
}

export async function deleteFolder(
  folderId: Match<F.DeleteFolder, "uriParams">["id"],
  config: Match<F.DeleteFolder, "param">
) {
  return canvas<F.DeleteFolder>({
    uri: "/api/v1/folders/:id",
    uriParams: {id: folderId},
    method: "DELETE",
    param: config,
  })
}

// ** Low level file uploading api. This will only create a pending
// file on canvas' server. To perform an entire data upload please
// use uploadAFile() in `uploadPolily.ts`.
export async function uploadAFileENDPOINT(
  folderId: Match<F.UploadAFile, "uriParams">["folder_id"],
  config: Match<F.UploadAFile, "param">
) {
  return canvas<F.UploadAFile>({
    uri: "/api/v1/folders/:folder_id/files",
    uriParams: {folder_id: folderId},
    method: "POST",
    param: config,
  });
}

export async function CopyAFile(
  destFolderId: Match<F.CopyAFile, "uriParams">["dest_folder_id"],
  config: Match<F.CopyAFile, "param">,
) {
  return canvas<F.CopyAFile>({
    uri: "/api/v1/folders/:dest_folder_id/copy_file",
    uriParams: {dest_folder_id: destFolderId},
    method: "POST",
    param: config,
  })
}

export async function CopyAFolder(
  destFolderId: Match<F.CopyAFolder, "uriParams">["dest_folder_id"],
  config: Match<F.CopyAFolder, "param">,
) {
  return canvas<F.CopyAFolder>({
    uri: "/api/v1/folders/:dest_folder_id/copy_folder",
    uriParams: {dest_folder_id: destFolderId},
    method: "POST",
    param: config,
  })
}
