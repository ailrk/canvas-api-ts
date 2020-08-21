import {API} from './types';
import * as ResponseType from './responseTypes';

export type AssignmentParam = Partial<{
  include: (
    | "submission"
    | "assignment_visibility"
    | "all_dates"
    | "overrides"
    | "observed_users"
    | "can_edit")[],
  search_term: string,
  override_assignment_dates: boolean,
  needs_grading_count_by_section: boolean,
  bucket:
  | "past" | "overdue" | "undated" | "ungraded" | "unsubmitted"
  | "upcoming" | "future",
  assignment_ids: string[],
  order_by: "position" | "name" | "due_at",
  post_to_sis: boolean
}>;

export type DeleteAnAssignment = API<
  "/api/v1/courses/:course_id/assignments/:id",
  {course_id: number, id: number},
  "DELETE",
  {},
  ResponseType.Assignment>;

export type ListAssignments = API<
  "/api/v1/courses/:course_id/assignments",
  {course_id: number},
  "GET",
  AssignmentParam,
  ResponseType.Assignment[]>;

export type ListAssignmentsByAssignmentGroup = API<
  "/api/v1/courses/:course_id/assignment_groups/:assignment_group_id/assignments",
  {course_id: number, assignment_group_id: number},
  "GET",
  AssignmentParam,
  ResponseType.Assignment[]>;

export type ListAssignmensByUser = API<
  "/api/v1/users/:user_id/courses/:course_id/assignments",
  {user_id: number | "self", course_id: number},
  "GET",
  AssignmentParam,
  ResponseType.Assignment[]>;

export type AnAssignmet = API<
  "/api/v1/courses/:course_id/assignments/:id",
  {course_id: number, id: number},
  "GET",
  Partial<{
    include: (
      | "submission" | "assignment_visibility" | "overrides"
      | "observed_users" | "can_edit")[],
    override_assignment_dates: boolean,
    needs_grading_count_by_section: boolean,
    all_dates: boolean,
  }>,
  ResponseType.Assignment>;

export type CreateNewAssignment = API<
  "/api/v1/courses/:course_id/assignments",
  {course_id: number},
  "POST",
  Partial<
    {
      notify_of_update: boolean,
      assignment_overrides: ResponseType.AssignmentOverride[],
      quiz_lti: boolean,
      assignment_group_id: number,
    } &

    Pick<ResponseType.Assignment,
      | "name" | "position" | "submission_types" | "allowed_attempts"
      | "turnitin_enabled" | "vericite_enabled" | "turnitin_settings"
      | "integration_data"

      | "integration_id" | "peer_reviews"
      | "automatic_peer_reviews"
      | "group_category_id"

      | "grade_group_students_individually" | "external_tool_tag_attributes"
      | "points_possible" | "grading_type" | "due_at" | "lock_at"
      | "unlock_at" | "description"
      | "only_visible_to_overrides" | "published" | "grading_standard_id"
      | "omit_from_final_grade" | "moderated_grading" | "grader_count"
      | "final_grader_id" | "grader_comments_visible_to_graders"
      | "graders_anonymous_to_graders"
      | "grader_names_visible_to_final_grader"
      | "anonymous_grading">>,
  ResponseType.Assignment>;

export type EditAnAssignment = API<
  "/api/v1/courses/:course_id/assignments/:id",
  {course_id: number, id: number},
  "PUT",
  Partial<
    {
      notify_of_update: boolean,
      assignment_overrides: ResponseType.AssignmentOverride[],
      assignment_group_id: number,
      sis_assignment_id: string,
    } &

    Pick<ResponseType.Assignment,
      | "name" | "position" | "submission_types" | "allowed_attempts"
      | "turnitin_enabled" | "vericite_enabled" | "turnitin_settings"
      | "integration_data" | "integration_id" | "peer_reviews"
      | "automatic_peer_reviews"
      | "group_category_id"
      | "grade_group_students_individually" | "external_tool_tag_attributes"
      | "points_possible" | "grading_type" | "due_at" | "lock_at"
      | "unlock_at" | "description"
      | "only_visible_to_overrides" | "published" | "grading_standard_id"
      | "omit_from_final_grade" | "moderated_grading" | "grader_count"
      | "final_grader_id" | "grader_comments_visible_to_graders"
      | "graders_anonymous_to_graders"
      | "grader_names_visible_to_final_grader"
      | "anonymous_grading">>,
  ResponseType.Assignment>;

export type ListAssigmentOverrides = API<
  "/api/v1/courses/:course_id/assignments/:assignment_id/overrides",
  {course_id: number, assignment_id: number},
  "GET",
  {},
  ResponseType.AssignmentOverride[]>;

export type GetAnAssignmentOverride = API<
  "/api/v1/courses/:course_id/assignments/:assignment_id/overrides/:id",
  {course_id: number, assignment_id: number, overrides: number},
  "GET",
  {},
  ResponseType.AssignmentOverride>;

export type CreateAnAssignmentOverride = API<
  "/api/v1/courses/:course_id/assignments/:assignment_id/overrides",
  {course_id: number, assignment_id: number},
  "POST",
  Partial<
    Pick<ResponseType.AssignmentOverride,
      | "student_ids"
      | "title"
      | "group_id"
      | "course_section_id"

      | "due_at"
      | "unlock_at"
      | "lock_at">>,
  ResponseType.AssignmentOverride>;

export type UpdateAnAssignmentOverride = API<
  "/api/v1/courses/:course_id/assignments/:assignment_id/overrides/:id",
  {course_id: number, assignment_id: number, id: number},
  "PUT",
  Partial<
    Pick<ResponseType.AssignmentOverride,
      "student_ids" | "title" | "due_at" | "unlock_at" | "lock_at">>,
  ResponseType.AssignmentOverride>;

export type DeleteAnAssignmentOverride = API<
  "/api/v1/courses/:course_id/assignments/:assignment_id/overrides/:id",
  {course_id: number, assignment_id: number, id: number},
  "DELETE",
  {},
  ResponseType.AssignmentOverride>;
