import {API} from './types';
import * as ResponseType from './responseTypes';

// API for handling acounts
// source https://canvas.instructure.com/doc/api/accounts.html
export type Acounts = API<
  "/api/v1/accounts",
  {},
  "GET",
  Partial<{include: ("lti_guid" | "registration_settings" | "services")[]}>,
  ResponseType.Account[]>;

export type CourseAccounts = API<
  "/api/v1/course_accounts",
  {},
  "GET",
  {},
  ResponseType.Account[]>;

export type AccountId = API<
  "/api/v1/accounts/:id",
  {id: number | "self"},
  "GET",
  {},
  ResponseType.Account>;

export type AccountPermissions = API<
  "/api/v1/accounts/:account_id/permissions",
  {account_id: number | "self"},
  "GET",
  Partial<{permissions: string[]}>,
  {manage_account_memberships: boolean, become_user: boolean}>;

export type SubAccount = API<
  "/api/v1/accounts/:account_id/sub_accounts",
  {account_id: number | "self"},
  "GET",
  Partial<{recursive: boolean}>,
  ResponseType.Account[]>;

export type TermOfService = API<
  "/api/v1/accounts/:account_id/terms_of_service",
  {account_id: number | "self"},
  "GET",
  {},
  ResponseType.TermOfService>;

export type AllCourseInAccount = API<
  "/api/v1/accounts/:account_id/courses",
  {account_id: number | "self"},
  "GET",
  Partial<{
    with_enrollments: boolean,
    enrollment_type: ("teacher" | "student" | "ta" | "obserber" | "design")[],
    published: boolean,
    completed: boolean,
    blueprint: boolean,
    blueprint_associated: boolean,
    by_teachers: number[],
    by_subaccounts: number[],
    hide_enrollmentless_courses: boolean,
    state: (
      | "created"
      | "claimed"
      | "available"
      | "completed"
      | "deleted"
      | "all")[],
    enrollment_term_id: number,
    search_term: string,
    include: (
      | "syllabus_body"
      | "term"
      | "course_progress"
      | "storage_quota_used_mb"
      | "total_students"
      | "teachers"
      | "account_name"
      | "concluded")[],
    sort: "course_name" | "sis_course_id" | "teacher" | "account_name",
    order: "asc" | "desc",
    search_by: "course" | "teacher",
    starts_before: Date,
    ends_after: Date,
  }>,
  ResponseType.Course[]>;

export type UpdateAccount = API<
  "/api/v1/accounts/:id",
  {id: number | "self"},
  "PUT",
  {
    account: Partial<{
      name: string,
      sis_account_id: string,
      default_time_zone: string,
      default_storage_quota_mb: number,
      default_user_storage_quota_mb: number,
      default_group_storage_quota_mb: number,
      settings: {
        restrict_student_past_view: {
          value: boolean,
          locked: boolean,
        },
        restrict_student_future_view: {
          value: boolean,
          locked: boolean,
        },
        lock_all_announcements: {
          value: boolean,
          locked: boolean,
        },
        usage_rights_required: {
          value: boolean,
          locked: boolean,
        },
        restrict_student_future_listing: {
          value: boolean,
          locked: boolean,
        },
        lock_outcome_proficiency: {
          value: boolean,
          locked: boolean,
        },
        lock_proficiency_calculation: {
          value: boolean,
          locked: boolean,
        },
        services: string,
      }
    }>
  },
  ResponseType.Account>;

export type DeleteAccountFromRootAccount = API<
  "/api/v1/accounts/:account_id/users/:user_id",
  {account_id: number | "self", user_id: number | "self"},
  "DELETE",
  {},
  ResponseType.User>;

export type CreateNewSubAccount = API<
  "/api/v1/accounts/:account_id/sub_accounts",
  {account_id: number | "self"},
  "POST",
  {
    account: {
      name: string,
      sis_account_id?: string,
      default_storage_quota_mb?: string,
      default_user_storage_quota_mb?: string,
      default_group_storage_quota_mb?: string,
    }
  },
  ResponseType.Account>;

export type DeleteSubAccount = API<
  "/api/v1/accounts/:account_id/sub_accounts/:id",
  {account_id: number | "self", id: number | "self"},
  "DELETE",
  {},
  ResponseType.Account>;
