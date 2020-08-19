import {HTTPMethod} from '../request/types';
export type DateString = string;
export type HTMLString = string;
export type URLString = string;
export type FileNameString = string;
export type ContentTypeString = string;
export type MIMETypeString = string;

export interface API<U extends string, M extends HTTPMethod, P, R> {
  url: U,
  method: M,
  param: P,
  response: R,
};

// TODO add new end points here.
export type APIEndpoints = AccountAPI.TermOfService;

// All the repsonse types are under this namespace.
namespace ResponseType {
  export interface Account {  // LTI
    // the ID of the Account object
    id: number,

    // The display name of the account
    name: string,

    // The UUID of the account "WvAHhY5FINzq5IyRIJybGeiXyFkG3SqHUPb7jZY5"
    uuid: string,

    // The account's parent ID, or null if this is the root account
    parent_account_id?: number,

    // The ID of the root account, or null if this is the root account
    root_account_id?: number,

    // The state of the account. Can be 'active' or 'deleted'.
    workflow_state: "active" | "deleted",
  };

  export interface Account {
    // The storage quota for the account in megabytes, if not otherwise specified
    default_storage_quota_mb?: number,

    // The storage quota for a user in the account in megabytes, if not otherwise
    // specified
    default_user_storage_quota_mb?: number,

    // he storage quota for a group in the account in megabytes, if not otherwise
    // specified
    default_group_storage_quota_mb?: number,

    // The default time zone of the account. Allowed time zones are
    // {http://www.iana.org/time-zones IANA time zones} or friendlier
    // {http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html Ruby on Rails
    // time zones}.
    default_time_zone?: string,

    // The account's identifier in the Student Information System. Only included if
    // the user has permission to view SIS information.
    sis_account_id?: string,

    // The account's identifier in the Student Information System. Only included if
    // the user has permission to view SIS information.
    integration_id?: string,

    // The id of the SIS import if created through SIS. Only included if the user
    // has permission to manage SIS information.
    sis_import_id?: number,

    // The account's identifier that is sent as context_id in LTI launches.
    lti_guid: string,
  }

  export interface TermOfService {
    // Terms Of Service id
    id: number,

    // The given type for the Terms of Service
    terms_type: string,

    // Boolean dictating if the user must accept Terms of Service
    passive: boolean,

    // The id of the root account that owns the Terms of Service
    account_id: number,

    // Content of the Terms of Service
    content: string,
  }

  export interface Term {
    id: number,

    name: string,

    start_at?: DateString,

    end_at?: DateString
  }

  export interface CalendarLink {
    // The URL of the calendar in ICS format
    ics: URLString,
  }

  export interface Grade {
    // The URL to the Canvas web UI page for the user's grades, if this is a student
    // enrollment.
    html_url: URLString,

    // The user's current grade in the class. Only included if user has permissions
    // to view this grade.
    current_grade?: string,

    //The user's final grade for the class. Only included if user has permissions
    // to view this grade.
    final_grade?: string,

    // The user's current score in the class. Only included if user has permissions
    // to view this score.
    current_score?: string,

    // The user's final score for the class. Only included if user has permissions
    // to view this score.
    final_score?: string,

    // The total points the user has earned in the class. Only included if user has
    // permissions to view this score and 'current_points' is passed in the
    // request's 'include' parameter.
    current_points?: number,

    // The user's current grade in the class including muted/unposted assignments.
    // Only included if user has permissions to view this grade, typically teachers,
    // TAs, and admins.
    unposted_current_grade?: string,

    // The user's final grade for the class including muted/unposted assignments.
    // Only included if user has permissions to view this grade, typically teachers,
    // TAs, and admins..
    unposted_final_grade?: string,

    // The user's current score in the class including muted/unposted assignments.
    // Only included if user has permissions to view this score, typically teachers,
    // TAs, and admins..
    unposted_current_score?: string,
    // The user's final score for the class including muted/unposted assignments.
    // Only included if user has permissions to view this score, typically teachers,
    // TAs, and admins..
    unposted_final_score?: string,

    // The total points the user has earned in the class, including muted/unposted
    // assignments. Only included if user has permissions to view this score
    // (typically teachers, TAs, and admins) and 'current_points' is passed in the
    // request's 'include' parameter.
    unposted_current_points?: number
  }

  export interface Enrollment {
    // The ID of the enrollment.
    id: number,

    // The unique id of the course.
    course_id: number,

    // The SIS Course ID in which the enrollment is associated. Only displayed if
    // present. This field is only included if the user has permission to view SS
    // information.
    sis_course_id?: string,

    // The Course Integration ID in which the enrollment is associated. This field
    // is only included if the user has permission to view SIS information.
    course_integration_id?: string,

    // The unique id of the user's section.
    course_section_id: number,

    // The Section Integration ID in which the enrollment is associated. This field
    // is only included if the user has permission to view SIS information.
    section_integration_id?: string,

    // The SIS Account ID in which the enrollment is associated. Only displayed if
    // present. This field is only included if the user has permission to view SIS
    // information.
    sis_account_id?: string,

    // The SIS Section ID in which the enrollment is associated. Only displayed if
    // present. This field is only included if the user has permission to view SIS
    // information.
    sis_section_id?: string,

    // The SIS User ID in which the enrollment is associated. Only displayed if
    // present. This field is only included if the user has permission to view SIS
    // information.
    sis_user_id?: string,

    // The state of the user's enrollment in the course.
    enrollment_state: "active" | "invited" | "inactive",

    // User can only access his or her own course section.
    limit_privileges_to_course_section: boolean,

    // The unique identifier for the SIS import. This field is only included if the
    // user has permission to manage SIS information.
    sis_import_id: number,

    // The unique id of the user's account.
    root_account_id: number,

    // The enrollment type. One of 'StudentEnrollment', 'TeacherEnrollment',
    // 'TaEnrollment', 'DesignerEnrollment', 'ObserverEnrollment'.
    type:
    | 'StudentEnrollment'
    | 'TeacherEnrollment'
    | 'TaEnrollment'
    | 'DesignerEnrollment'
    | 'ObserverEnrollment',

    // The unique id of the user.
    user_id: number,

    // The unique id of the associated user. Will be null unless type is
    // ObserverEnrollment.
    associated_user_id?: number,

    // The enrollment role, for course-level permissions. This field will match
    // `type` if the enrollment role has not been customized.
    role: Enrollment["type"],

    // The id of the enrollment role.
    role_id: number,

    // The created time of the enrollment, in ISO8601 format.
    created_at: DateString,

    // The updated time of the enrollment, in ISO8601 format.
    updated_at: DateString,

    // The start time of the enrollment, in ISO8601 format.
    start_at: DateString,

    // The end time of the enrollment, in ISO8601 format.
    end_at: DateString,

    // The last activity time of the user for the enrollment, in ISO8601 format.
    last_activity_at: DateString,

    // The last attended date of the user for the enrollment in a course, in ISO8601
    // format.
    last_attended_at: DateString,

    // The total activity time of the user for the enrollment, in seconds.
    total_activity_time: number,

    // The URL to the Canvas web UI page for this course enrollment.
    html_url: URLString,

    // The URL to the Canvas web UI page containing the grades associated with this
    // enrollment.
    grades: {
      html_url: URLString,
      current_score: number,
      current_grade?: string,
      final_score: number,
      final_grade?: string
    },

    // A description of the user.
    user: {
      id: number,
      name: string,
      sortable_name: string,
      short_name: string
    },

    // The user's override grade for the course.
    override_grade: string,

    // The user's override score for the course.
    override_score: number,

    // The user's current grade in the class including muted/unposted assignments.
    // Only included if user has permissions to view this grade, typically teachers,
    // TAs, and admins.
    unposted_current_grade: string,

    // The user's final grade for the class including muted/unposted assignments.
    // Only included if user has permissions to view this grade, typically teachers,
    // TAs, and admins..
    unposted_final_grade: string,

    // The user's current score in the class including muted/unposted assignments.
    // Only included if user has permissions to view this score, typically teachers,
    // TAs, and admins..
    unposted_current_score: string,

    // The user's final score for the class including muted/unposted assignments.
    // Only included if user has permissions to view this score, typically teachers,
    // TAs, and admins..
    unposted_final_score: string,

    // optional: Indicates whether the course the enrollment belongs to has grading
    // periods set up. (applies only to student enrollments, and only available in
    // course endpoints)
    has_grading_periods?: boolean,

    // optional: Indicates whether the course the enrollment belongs to has the
    // Display Totals for 'All Grading Periods' feature enabled. (applies only to
    // student enrollments, and only available in course endpoints)
    totals_for_all_grading_periods_option?: boolean,

    // optional: The name of the currently active grading period, if one exists. If
    //
    // the course the enrollment belongs to does not have grading periods, or if no
    // currently active grading period exists, the value will be null. (applies only
    // to student enrollments, and only available in course endpoints)
    current_grading_period_title?: string,

    // optional: The id of the currently active grading period, if one exists. If
    //
    // the course the enrollment belongs to does not have grading periods, or if no
    // currently active grading period exists, the value will be null. (applies only
    // to student enrollments, and only available in course endpoints)
    current_grading_period_id?: number,

    // The user's override grade for the current grading period.
    current_period_override_grade: string,

    // The user's override score for the current grading period.
    current_period_override_score: number,

    // optional: The student's score in the course for the current grading period,
    //
    // including muted/unposted assignments. Only included if user has permission to
    // view this score, typically teachers, TAs, and admins. If the course the
    // enrollment belongs to does not have grading periods, or if no currently
    // active grading period exists, the value will be null. (applies only to
    // student enrollments, and only available in course endpoints)
    current_period_unposted_current_score?: number,

    // optional: The student's score in the course for the current grading period,
    // including muted/unposted assignments and including ungraded assignments with
    // a score of 0. Only included if user has permission to view this score,
    // typically teachers, TAs, and admins. If the course the enrollment belongs to
    // does not have grading periods, or if no currently active grading period
    // exists, the value will be null. (applies only to student enrollments, and
    // only available in course endpoints)
    current_period_unposted_final_score?: number,

    // optional: The letter grade equivalent of
    //
    // current_period_unposted_current_score, if available. Only included if user
    // has permission to view this grade, typically teachers, TAs, and admins. If
    // the course the enrollment belongs to does not have grading periods, or if no
    // currently active grading period exists, the value will be null. (applies only
    // to student enrollments, and only available in course endpoints)
    current_period_unposted_current_grade?: string,

    // optional: The letter grade equivalent of current_period_unposted_final_score,
    // if available. Only included if user has permission to view this grade,
    // typically teachers, TAs, and admins. If the course the enrollment belongs to
    // does not have grading periods, or if no currently active grading period
    // exists, the value will be null. (applies only to student enrollments, and
    // only available in course endpoints)
    current_period_unposted_final_grade?: string
  }

  export interface CourseProgress {
    // total number of requirements from all modules
    requirement_count: number,

    // total number of requirements the user has completed from all modules
    requirement_completed_count: number,

    // url to next module item that has an unmet requirement. null if the user has
    // completed the course or the current module does not require sequential
    // progress
    next_requirement_url: URLString,

    // date the course was completed. null if the course has not been completed by
    // this user
    completed_at: DateString
  }

  export interface User {
    // A Canvas user, e.g. a student, teacher, administrator, observer, etc.
    // The ID of the user.
    id: number,

    // The name of the user.
    name: string,

    // The name of the user that is should be used for sorting groups of users, such
    // as in the gradebook.
    sortable_name: string,

    // A short name the user has selected, for use in conversations or other less
    // formal places through the site.
    short_name: string,

    // The SIS ID associated with the user.  This field is only included if the user
    // came from a SIS import and has permissions to view SIS information.
    sis_user_id: string,

    // The id of the SIS import.  This field is only included if the user came from
    // a SIS import and has permissions to manage SIS information.
    sis_import_id: number,

    // The integration_id associated with the user.  This field is only included if
    // the user came from a SIS import and has permissions to view SIS information.
    integration_id: string,

    // The unique login id for the user.  This is what the user uses to log in to
    // Canvas.
    login_id: string,

    // If avatars are enabled, this field will be included and contain a url to
    // retrieve the user's avatar.
    avatar_url: URLString,

    // Optional: This field can be requested with certain API calls, and will return
    // a list of the users active enrollments. See the List enrollments API for more
    // details about the format of these records.
    enrollments?: Enrollment[],

    // Optional: This field can be requested with certain API calls, and will return
    // the users primary email address.
    email?: string,

    // Optional: This field can be requested with certain API calls, and will return
    // the users locale in RFC 5646 format.
    locale?: string,

    // Optional: This field is only returned in certain API calls, and will return a
    // timestamp representing the last time the user logged in to canvas.
    last_login?: DateString,

    // Optional: This field is only returned in certain API calls, and will return
    // the IANA time zone name of the user's preferred timezone.
    time_zone?: string,

    // Optional: The user's bio.
    bio?: string
  }

  export interface Course {
    // the unique identifier for the course
    id: number,

    // the SIS identifier for the course, if defined. This field is only included if
    // the user has permission to view SIS information.
    sis_course_id?: number,

    // the UUID of the course
    uuid: string,

    // the integration identifier for the course, if defined. This field is only
    // included if the user has permission to view SIS information.
    integration_id?: number,

    // the unique identifier for the SIS import. This field is only included if the
    // user has permission to manage SIS information.
    sis_import_id: number,

    // the full name of the course
    name: string,

    // the course code
    course_code: string,

    // the current state of the course one of 'unpublished', 'available',
    // 'completed', or 'deleted'
    workflow_state: "unpublished" | "available" | "completed" | "deleted",

    // the account associated with the course
    account_id: number,

    // the root account associated with the course
    root_account_id: number,

    // the enrollment term associated with the course
    enrollment_term_id: number,

    // the grading standard associated with the course
    grading_standard_id: number,

    // the grade_passback_setting set on the course
    grade_passback_setting: string,

    // the date the course was created.
    created_at: DateString,

    // the start date for the course, if applicable
    start_at: DateString,

    // the end date for the course, if applicable
    end_at: DateString,

    // the course-set locale, if applicable
    locale: string,

    // A list of enrollments linking the current user to the course. for student
    // enrollments, grading information may be included if include[]=total_scores
    enrollments?: Enrollment[],

    // optional: the total number of active and invited students in the course
    total_students?: number,

    // course calendar
    calendar: any[] | null,

    // the type of page that users will see when they first visit the course -
    // 'feed': Recent Activity Dashboard - 'wiki': Wiki Front Page - 'modules':
    // Course Modules/Sections Page - 'assignments': Course Assignments List -
    // 'syllabus': Course Syllabus Page other types may be added in the future
    default_view: "feed",

    // optional: user-generated HTML for the course syllabus
    syllabus_body?: HTMLString,

    // optional: the number of submissions needing grading returned only if the
    // current user has grading rights and include[]=needs_grading_count
    needs_grading_count?: number,

    // optional: the enrollment term object for the course returned only if
    // include[]=term
    term?: Term,

    // optional: information on progress through the course returned only if
    // include[]=course_progress
    course_progress?: CourseProgress,

    // weight final grade based on assignment group percentages
    apply_assignment_group_weights?: boolean,

    // optional: the permissions the user has for the course. returned only for a
    // single course and include[]=permissions
    permissions?: {
      create_discussion_topic: boolean,
      create_announcement: boolean
    },
    is_public: boolean,
    is_public_to_auth_users: boolean,
    public_syllabus: boolean,
    public_syllabus_to_auth: boolean,

    // optional: the public description of the course
    public_description?: string,
    storage_quota_mb: number,
    storage_quota_used_mb: number,
    hide_final_grades: boolean,
    license: string,
    allow_student_assignment_edits: boolean,
    allow_wiki_comments: boolean,
    allow_student_forum_attachments: boolean,
    open_enrollment: boolean,
    self_enrollment: boolean,
    restrict_enrollments_to_course_dates: boolean,
    course_format: string,

    // optional: this will be true if this user is currently prevented from viewing
    // the course because of date restriction settings
    access_restricted_by_date?: boolean,

    // The course's IANA time zone name.
    time_zone: string,

    // optional: whether the course is set as a Blueprint Course (blueprint fields
    // require the Blueprint Courses feature)
    blueprint?: boolean,

    // optional: Set of restrictions applied to all locked course objects
    blueprint_restrictions?: {
      content: boolean,
      points: boolean,
      due_dates: boolean,
      availability_dates: boolean
    },

    // optional: Sets of restrictions differentiated by object type applied to
    // locked course objects
    blueprint_restrictions_by_object_type?: {
      assignment: {
        content: boolean,
        points: boolean
      },
      wiki_page: {
        content: boolean
      }
    }
  }

  export interface File {
    id: number,
    uuid: string,
    folder_id: number,
    display_name: FileNameString,
    filename: FileNameString,
    "content-type": ContentTypeString,
    url: URLString,

    // file size in bytes
    size: number,
    created_at: DateString,
    updated_at: DateString,
    unlock_at: DateString,
    locked: boolean,
    hidden: boolean,
    lock_at: DateString,
    hidden_for_user: boolean,
    thumbnail_url?: URLString,
    modified_at: DateString,

    // simplified content-type mapping
    mime_class: MIMETypeString,

    // identifier for file in third-party transcoding service
    media_entry_id: string,
    locked_for_user: boolean,
    lock_info?: string,
    lock_explanation: string,

    // optional: url to the document preview. This url is specific to the user
    // making the api call. Only included in submission endpoints.
    preview_url?: URLString
  }

  export interface Folder {
    context_type: string,
    context_id: number,
    files_count: number,
    position: number,
    updated_at: DateString,
    folders_url: URLString,
    files_url: URLString,
    full_name: string,
    lock_at: DateString,
    id: number,
    folders_count: number,
    name: string,
    parent_folder_id: number,
    created_at: DateString,
    unlock_at?: DateString,
    hidden: boolean,
    hidden_for_user: boolean,
    locked: boolean,
    locked_for_user: boolean,

    // If true, indicates this is a read-only folder containing files submitted to
    // assignments
    for_submissions: boolean
  }

  export interface UsageRights {
    // Describes the copyright and license information for a File
    // Copyright line for the file
    legal_copyright: string,
    // Justification for using the file in a Canvas course. Valid values are
    // 'own_copyright', 'public_domain', 'used_by_permission', 'fair_use',
    // 'creative_commons'
    use_justification:
    | "own_copyright"
    | "public_domain"
    | "used_by_permission"
    | "fair_use"
    | "creative_commons",
    // License identifier for the file.
    license: string,
    // Readable license name
    license_name: string,
    // Explanation of the action performed
    message: string,
    // List of ids of files that were updated
    file_ids: number[]
  }

  export interface Liscense {
    // a short string identifying the license
    id: string,
    // the name of the license
    name: string,
    // a link to the license text
    url: URLString
  }

}


// API for handling acounts
// source https://canvas.instructure.com/doc/api/accounts.html
export namespace AccountAPI {
  export type Acounts = API<
    "/api/v1/accounts",
    "GET",
    Partial<{include: ("lti_guid" | "registration_settings" | "services")[]}>,
    ResponseType.Account[]>;

  export type CourseAccounts = API<
    "/api/v1/course_accounts",
    "GET",
    null,
    ResponseType.Account[]>;

  export type AccountId = API<
    "/api/v1/accounts/:id",
    "GET",
    null,
    ResponseType.Account>;

  export type AccountPermissions = API<
    "/api/v1/accounts/:account_id/permissions",
    "GET",
    Partial<{permissions: string[]}>,
    {manage_account_memberships: boolean, become_user: boolean}>;

  export type SubAccount = API<
    "/api/v1/accounts/:account_id/sub_accounts",
    "GET",
    Partial<{recursive: boolean}>,
    ResponseType.Account[]
  >;

  export type TermOfService = API<
    "/api/v1/accounts/:account_id/terms_of_service",
    "GET",
    null,
    ResponseType.TermOfService
  >;
  export type AllCourseInAccount = API<
    "/api/v1/accounts/:account_id/courses",
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
    "DELETE",
    null,
    ResponseType.User>;

  export type CreateNewSubAccount = API<
    "/api/v1/accounts/:account_id/sub_accounts",
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
    "DELETE",
    null,
    ResponseType.Account>;
}

// API for files
// https://canvas.instructure.com/doc/api/files.html
export namespace FilesAPI {
  export namespace Quota {
    export type GetCourseQuota = API<
      "/api/v1/courses/:course_id/files/quota",
      "GET",
      null,
      {quota: number, quota_used: number}>;

    export type GetGroupQuota = API<
      "/api/v1/groups/:group_id/files/quota",
      "GET",
      null,
      {quota: number, quota_used: number}>;

    export type GetUserQuota = API<
      "/api/v1/users/:user_id/files/quota",
      "GET",
      null,
      {quota: number, quota_used: number}>;
  }

  export namespace List {
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

    export type GetCourseList = API<
      "/api/v1/courses/:course_id/files",
      "GET",
      Partial<ListParam>,
      ResponseType.File[]>;

    export type GetUserList = API<
      "/api/v1/users/:user_id/files",
      "GET",
      Partial<ListParam>,
      ResponseType.File[]>;

    export type GetGroupList = API<
      "/api/v1/groups/:group_id/files",
      "GET",
      Partial<ListParam>,
      ResponseType.File[]>;

    export type GetFolderList = API<
      "/api/v1/folders/:id/files",
      "GET",
      Partial<ListParam>,
      ResponseType.File[]>;
  }

  export namespace GetFile {
    export type typeGetFile = API<
      "/api/v1/files/:id",
      "GET",
      Partial<{include: ("user" | "usage_rights")[]}>,
      ResponseType.File>;

    export type typeGetFilePost = API<
      "/api/v1/files/:id",
      "POST",
      Partial<{include: ("user" | "usage_rights")[]}>,
      ResponseType.File>;

    export type typeGetCourseFile = API<
      "/api/v1/courses/:course_id/files/:id",
      "GET",
      Partial<{include: ("user" | "usage_rights")[]}>,
      ResponseType.File>;

    export type typeGetGroupFile = API<
      "/api/v1/groups/:group_id/files/:id",
      "GET",
      Partial<{include: ("user" | "usage_rights")[]}>,
      ResponseType.File>;

    export type typeGetUserFile = API<
      "/api/v1/users/:user_id/files/:id",
      "GET",
      Partial<{include: ("user" | "usage_rights")[]}>,
      ResponseType.File>;
  }

  export type UpateFile = API<
    "/api/v1/files/:id",
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
    "DELETE",
    Partial<{replace: boolean}>,
    ResponseType.File>;

}


