import {CoursesAPI as C} from '../api/types';
import {canvas, Match} from '../request/requestBuidler';


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
): Promise<Match<C.ListMyCourses, "response">>

export async function getCourses(
  param: Match<C.ListCoursesForAUser, "param">,
  userId: number | "self"
): Promise<Match<C.ListCoursesForAUser, "response">>

export async function getCourses(
  param:
    | Match<C.ListMyCourses, "param">
    | Match<C.ListCoursesForAUser, "param">,
  userId?: number | "self"
) {
  if (userId === undefined) {
    return canvas<C.ListMyCourses>({
      uri: "/api/v1/courses",
      method: "GET",
      param,
    });
  } else {
    return canvas<C.ListCoursesForAUser>({
      uri: "/api/v1/users/:user_id/courses",
      uriParams: {user_id: userId},
      method: "GET",
      param,
    })
  }
}

export async function getCourseByUser(
  userId: Match<C.ListCoursesForAUser, "uriParams">["user_id"],
  config: Match<C.ListCoursesForAUser, "param">,
) {
  return canvas<C.ListCoursesForAUser>({
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
