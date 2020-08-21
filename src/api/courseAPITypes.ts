import {API} from './types';
import * as ResponseType from './responseTypes';
import {Permission} from './permissionTypes';
import {
  DateString,
  HTMLString,
  MIMETypeString,
  URLString,
} from './aliases';


type Include = (
  | "needs_grading_count" | "syllabus_body" | "public_description" | "total_scores"
  | "current_grading_period_scores" | "term" | "account" | "course_progress"
  | "sections" | "storage_quota_used_mb" | "total_students" | "passback_status"
  | "favorites" | "teachers" | "observed_users" | "course_image" | "concluded"
)[]

export type ListMyCourses = API<
  "/api/v1/courses",
  {},
  "GET",
  Partial<{
    enrollment_type:
    | "teacher"
    | "student"
    | "ta"
    | "observer"
    | "designer",
    enrollment_role: string,
    enrollment_role_id: number,
    enrollment_state: "active" | "invited_or_pending" | "completed",
    exclude_blueprint_courses: boolean,
    include: Include
    state: (
      | "unpublished"
      | "available"
      | "completed"
      | "deleted")[]
  }>,
  ResponseType.Course[]>;

export type ListCoursesByAUser = API<
  "/api/v1/users/:user_id/courses",
  {user_id: number | "self"},
  "GET",
  Partial<{
    enrollment_state: "active" | "invited_or_pending" | "completed",
    include: Include,
    state: (
      | "unpublished"
      | "available"
      | "completed"
      | "deleted"
    )[]
  }>,
  ResponseType.Course[]>;

export type CreateNewCourse = API<
  "/api/v1/accounts/:account_id/courses",
  {account_id: number | "self"},
  "POST",
  Partial<{
    course: {

      name: string,

      course_code: string,

      // the start date for the course, if applicable
      start_at: DateString,

      // the end date for the course, if applicable
      end_at: DateString,

      license: string,

      is_public: boolean,

      is_public_to_auth_users: boolean,

      public_syllabus: boolean,

      public_syllabus_to_auth: boolean,

      // optional: the public description of the course
      public_description?: string,

      allow_student_wiki_edits: boolean,

      allow_wiki_comments: boolean,

      allow_student_forum_attachments: boolean,

      open_enrollment: boolean,

      self_enrollment: boolean,

      restrict_enrollments_to_course_dates: boolean,

      term_id: number[],

      sis_course_id: string,

      integration_id: string,

      apply_assignment_group_weights: boolean,

      time_zone: string,

      default_view:
      | "feed"
      | "wiki"
      | "modules"
      | "syllabus"
      | "assignments",

      syllabus_body: HTMLString,

      grading_standard_id: string,

      grade_passback_setting: "nightly_sync" | "disable" | ""

      course_format: "on_campus" | "online" | "blended"
    },

    offer: boolean,

    enroll_me: boolean,

    enable_sis_reactivation: boolean
  }>,
  ResponseType.Course>;

export type GetACourse = API<
  "/api/v1/courses/:id",
  {id: number},
  "GET",
  Partial<{
    include: (
      | "needs_grading_count"
      | "syllabus_body"
      | "public_description"
      | "total_scores"
      | "current_grading_period_scores"
      | "term"
      | "account"
      | "course_progress"
      | "sections"
      | "storage_quota_used_mb"
      | "total_students"
      | "passback_status"
      | "favorites"
      | "teachers"
      | "observed_users"
      | "all_courses"
      | "permisions"
      | "observed_users"
      | "course_image"
      | "concludeds"
    )[],
    teacher_limit: number,
  }>,
  ResponseType.Course>;

// https://canvas.instructure.com/doc/api/file.file_uploads.html
export type UploadFile = API<
  "/api/v1/courses/:course_id/files",
  {course_id: number},
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

export type ListStudents = API<
  "/api/v1/courses/:course_id/students",
  {course_id: number},
  "GET",
  {},
  ResponseType.User[]>;

export type ListUserInCourse = API<
  "/api/v1/courses/:course_id/users",
  {course_id: number},
  "GET",
  Partial<{
    search_term: string,

    sort: string,

    enrollment_type: ("teacher" | "student" | "ta" | "obserber" | "design")[],

    enrollment_role: string,

    enrollment_role_id: number,

    include: (
      | "enrollments"
      | "locked"
      | "avatar_url"
      | "test_student"
      | "bio"
      | "custom_links"
      | "current_grading_period_scores"
      | "uuid")[]

    user_id: string,

    user_ids: number[],

    enrollment_state: string[],
  }>,
  ResponseType.User[]>;

export type GetEffectiveDueDates = API<
  "/api/v1/courses/:course_id/effective_due_dates",
  {course_id: number},
  "GET",
  Partial<{
    assignment_ids: string[]
  }>,
  {
    [assignment_id: string]: {
      [student_id: string]: {
        due_at: DateString,
        grading_period_id?: number,
        in_closed_grading_period: boolean
      }
    }
  }>;

export type GetPermission = API<
  "/api/v1/courses/:course_id/permissions",
  {course_id: number},
  "GET",
  Partial<{permissions: Permission[]}>,
  {[permissions: string]: string}>;
