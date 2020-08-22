import * as C from '../api/courseAPITypes';
import {canvas, Match} from '../request/requestBuidler';
import {Permission} from '../api/permissionTypes';


export async function createCourse(
  accountId: Match<C.CreateNewCourse, "uriParams">,
  courseInfo: Match<C.CreateNewCourse, "param">
) {
  return canvas<C.CreateNewCourse>({
    uri: "/api/v1/accounts/:account_id/courses",
    uriParams: accountId,
    method: "POST",
    param: courseInfo,
  });
}

export async function getCourse(
  courseId: Match<C.GetACourse, "uriParams">["id"],
  includes: Match<C.GetACourse, "param">["include"],
  teacherLimit?: number,
) {
  return canvas<C.GetACourse>({
    uri: "/api/v1/courses/:id",
    uriParams: {id: courseId},
    method: "GET",
    param: {
      include: Array.from(new Set(includes)),
      teacher_limit: teacherLimit,
    }
  })
}

export async function getCourses(
  param: Match<C.ListMyCourses, "param">
) {
  return canvas<C.ListMyCourses>({
    uri: "/api/v1/courses",
    method: "GET",
    param,
  });
}

export async function getCoursesByUser(
  userId: number | "self",
  param: Match<C.ListCoursesByAUser, "param">
) {
  return canvas<C.ListCoursesByAUser>({
    uri: "/api/v1/users/:user_id/courses",
    uriParams: {user_id: userId},
    method: "GET",
    param,
  })
}

export async function getCourseByUser(userId: Match<C.ListCoursesByAUser, "uriParams">["user_id"],
  config: Match<C.ListCoursesByAUser, "param">,
) {
  return canvas<C.ListCoursesByAUser>({
    uri: "/api/v1/users/:user_id/courses",
    uriParams: {user_id: userId},
    method: "GET",
    param: config
  })
}


export async function getUsersInCourse(
  courseId: Match<C.ListUserInCourse, "uriParams">["course_id"],
  config: Match<C.ListUserInCourse, "param">
) {
  return canvas<C.ListUserInCourse>({
    uri: "/api/v1/courses/:course_id/users",
    uriParams: {course_id: courseId},
    method: "GET",
    param: config,
  });
}

export async function getStudentsInCourse(
  courseId: Match<C.ListStudents, "uriParams">["course_id"],
) {
  return canvas<C.ListStudents>({
    uri: "/api/v1/courses/:course_id/students",
    uriParams: {course_id: courseId},
    method: "GET",
    param: {},
  });
}

export async function getCourseEffectiveDueDates(
  courseId: Match<C.GetEffectiveDueDates, "uriParams">["course_id"],
  config: Match<C.GetEffectiveDueDates, "param">,
) {
  return canvas<C.GetEffectiveDueDates>({
    uri: "/api/v1/courses/:course_id/effective_due_dates",
    uriParams: {course_id: courseId},
    method: "GET",
    param: config,
  });
}

export async function getCoursePermission(
  courseId: Match<C.GetPermission, "uriParams">["course_id"],
  permissions: Permission[],
) {
  return canvas<C.GetPermission>({
    uri: "/api/v1/courses/:course_id/permissions",
    uriParams: {course_id: courseId},
    method: "GET",
    param: {permissions},
  });
}
