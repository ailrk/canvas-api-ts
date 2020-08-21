import * as A from '../api/assignmentAPITypes';
import {canvas, Match} from '../request/requestBuidler';



export async function deleteAssignment(
  ids: Match<A.DeleteAnAssignment, "uriParams">,
) {
  return canvas<A.DeleteAnAssignment>({
    uri: "/api/v1/courses/:course_id/assignments/:id",
    uriParams: ids,
    method: "DELETE",
    param: {}
  })
}


export async function getAssignments(
  courseId: Match<A.ListAssignments, "uriParams">["course_id"],
  config: A.AssignmentParam,
) {
  return canvas<A.ListAssignments>({
    uri: "/api/v1/courses/:course_id/assignments",
    uriParams: {course_id: courseId},
    method: "GET",
    param: config,
  });
}


export async function getAssignmentsByAssignmentGroup(
  ids: Match<A.ListAssignmentsByAssignmentGroup, "uriParams">,
  config: A.AssignmentParam,
) {
  return canvas<A.ListAssignmentsByAssignmentGroup>({
    uri: "/api/v1/courses/:course_id/assignment_groups/:assignment_group_id/assignments",
    uriParams: ids,
    method: "GET",
    param: config,
  });
}


export async function getAssignmentsByUser(
  ids: Match<A.ListAssignmensByUser, "uriParams">,
  config: A.AssignmentParam,
) {
  return canvas<A.ListAssignmensByUser>({
    uri: "/api/v1/users/:user_id/courses/:course_id/assignments",
    uriParams: ids,
    method: "GET",
    param: config,
  });
}

export async function getAnAssignment(
  ids: Match<A.AnAssignmet, "uriParams">,
  config: Match<A.AnAssignmet, "param">,
) {
  return canvas<A.AnAssignmet>({
    uri: "/api/v1/courses/:course_id/assignments/:id",
    uriParams: ids,
    method: "GET",
    param: config,
  })
}


export async function createNewAssigment(
  courseId: Match<A.CreateNewAssignment, "uriParams">["course_id"],
  config: Match<A.CreateNewAssignment, "param">,
) {
  return canvas<A.CreateNewAssignment>({
    uri: "/api/v1/courses/:course_id/assignments",
    uriParams: {course_id: courseId},
    method: "POST",
    param: config,
  })
}


export async function editAssigment(
  ids: Match<A.EditAnAssignment, "uriParams">,
  config: Match<A.EditAnAssignment, "param">,
) {
  return canvas<A.EditAnAssignment>({
    uri: "/api/v1/courses/:course_id/assignments/:id",
    uriParams: ids,
    method: "PUT",
    param: config,
  })
}


export async function getAssignmentOverrides(
  ids: Match<A.ListAssigmentOverrides, "uriParams">,
  config: Match<A.ListAssigmentOverrides, "param">,
) {
  return canvas<A.ListAssigmentOverrides>({
    uri: "/api/v1/courses/:course_id/assignments/:assignment_id/overrides",
    uriParams: ids,
    method: "GET",
    param: config,
  });
}


export async function getAnAssignmentOverride(
  ids: Match<A.GetAnAssignmentOverride, "uriParams">,
  config: Match<A.GetAnAssignmentOverride, "param">,
) {
  return canvas<A.GetAnAssignmentOverride>({
    uri: "/api/v1/courses/:course_id/assignments/:assignment_id/overrides/:id",
    uriParams: ids,
    method: "GET",
    param: config,
  });
}


export async function updateAnAssignmentOverride(
  ids: Match<A.UpdateAnAssignmentOverride, "uriParams">,
  config: Match<A.UpdateAnAssignmentOverride, "param">,
) {
  return canvas<A.UpdateAnAssignmentOverride>({
    uri: "/api/v1/courses/:course_id/assignments/:assignment_id/overrides/:id",
    uriParams: ids,
    method: "PUT",
    param: config,
  });
}

export async function deleteAnAssignmentOverride(
  ids: Match<A.DeleteAnAssignment, "uriParams">,
) {
  return canvas<A.DeleteAnAssignment>({
    uri: "/api/v1/courses/:course_id/assignments/:id",
    uriParams: ids,
    method: "DELETE",
    param: {},
  });
}
