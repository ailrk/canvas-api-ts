import {
  DateString,
  HTMLString,
  URLString,
  FileNameString,
  ContentTypeString,
  MIMETypeString,

} from './aliases';
import {HTTPMethod} from 'src/request/types';

// All the repsonse types are under this namespace.
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

export interface UserDisplay {
  // This mini-object is used for secondary user responses, when we just want to
  // provide enough information to display a user.

  // The ID of the user.
  id: number,

  // A short name the user has selected, for use in conversations or other less
  // foral places through the site.
  short_name: string,

  // If avatars are enabled, this field will be included and contain a url to
  // retrieve the user's avatar.
  avatar_image_url: URLString,

  // URL to access user, either nested to a context or directly.
  html_url: URLString,
}

export interface AnonymousUserDisplay {
  // This mini-object is returned in place of UserDisplay when returning student
  // data for anonymous assignments, and includes an anonymous ID to identify a
  // user within the scope of a single assignment.

  // A unique short ID identifying this user within the scope of a particular
  // assignment.
  anonymous_id: string,
  // A URL to retrieve a generic avatar.
  avatar_image_url: URLString,
}

export interface Profile {
  // Profile details for a Canvas user.

  // The ID of the user.
  id: number,

  // Sample User
  name: string,

  // Sample User
  short_name: string,

  // user, sample
  sortable_name: string,

  title?: string,
  bio?: string,

  // sample_user@example.com
  primary_email: string,

  // sample_user@example.com
  login_id: string,

  // sis1
  sis_user_id: string,

  lti_user_id?: string,

  // The avatar_url can change over time, so we recommend not caching it for more
  // than a few hours
  avatar_url: URLString,

  calendar: null,

  // Optional: This field is only returned in certain API calls, and will return
  // the IANA time zone name of the user's preferred timezone.
  time_zone?: string,

  // The users locale.
  locale?: string,
}

export interface Avatar {
  // Possible avatar for a user.
  // ['gravatar'|'attachment'|'no_pic'] The type of avatar record, for
  // categorization purposes.
  type: "gravatar" | "attachment" | "no_pic",

  // The url of the avatar
  url: URLString,

  // A unique representation of the avatar record which can be used to set the
  // avatar with the user update endpoint. Note: this is an internal
  // representation and is subject to change without notice. It should be consumed
  // with this api endpoint and used in the user update endpoint, and should not
  // be constructed by the client.
  token: string,

  // A textual description of the avatar record.
  display_name: string,

  // ['attachment' type only] the internal id of the attachment
  id?: number,

  // ['attachment' type only] the content-type of the attachment.
  "content-type"?: MIMETypeString,

  // ['attachment' type only] the filename of the attachment
  filename: FileNameString,

  // ['attachment' type only] the size of the attachment
  size: number
}

export interface PageView {
  // The record of a user page view access in Canvas
  // A UUID representing the page view.  This is also the unique request id
  id: string,

  // If the request is from an API request, the app that generated the access
  // token
  app_name: string,

  // The URL requested
  url: URLString,

  // The type of context for the request
  context_type: string,

  // The type of asset in the context for the request, if any
  asset_type: string,

  // The rails controller that handled the request
  controller: string,

  // The rails action that handled the request
  action: string,

  // This field is deprecated, and will always be false
  contributed: boolean,

  // An approximation of how long the user spent on the page, in seconds
  interaction_seconds: number,

  // When the request was made
  created_at: DateString,

  // A flag indicating whether the request was user-initiated, or automatic (such
  // as an AJAX call)
  user_request: boolean,

  // How long the response took to render, in seconds
  render_time: number,

  // The user-agent of the browser or program that made the request
  user_agent: string,

  // True if the request counted as participating, such as submitting homework
  participated: boolean,

  // The HTTP method such as GET or POST
  http_method: HTTPMethod,

  // The origin IP address of the request
  remote_ip: string,

  // The page view links to define the relationships
  links: {
    user: number,
    account: number
  }
}

export interface PageViewLinks {
  // The links of a page view access in Canvas
  // The ID of the user for this page view
  user: number,

  // The ID of the context for the request (course id if context_type is Course,
  // etc)
  context: number,

  // The ID of the asset for the request, if any
  asset: number,

  // The ID of the actual user who made this request, if the request was made by a
  // user who was masquerading
  real_user: number,

  // The ID of the account context for this page view
  account: number
}

export interface CourseNickName {
  // the ID of the course
  course_id: number,
  // the actual name of the course
  name: string,
  // the calling user's nickname for the course
  nickname: string
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
  parent_folder_id: string,
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

export interface Progress {
  // the ID of the Progress object
  id: number,

  // the context owning the job.
  context_id: number,

  context_type: string,

  // the id of the user who started the job
  user_id: number,

  // the type of operation
  tag: string,

  //percent completed
  completion: number,

  // the state of the job one of 'queued', 'running', 'completed', 'failed'
  workflow_state: "queued" | "completed" | "running" | "failed",

  // the time the job was created
  created_at: DateString,

  // the time the job was last updated
  updated_at: DateString,

  // optional details about the job
  message?: string,

  // optional results of the job. omitted when job is still pending
  results?: {id: string},

  // url where a progress update can be retrieved
  url: URLString
}

export interface DiscussinoTopic {
  // A discussion topic
  // The ID of this topic.
  id: number,

  // The topic title.
  title: string,

  // The HTML content of the message body.
  message: HTMLString,

  // The URL to the discussion topic in canvas.
  html_url: URLString,

  // The datetime the topic was posted. If it is null it hasn't been posted yet.
  // (see delayed_post_at)
  posted_at: DateString,

  // The datetime for when the last reply was in the topic.
  last_reply_at: DateString,

  // If true then a user may not respond to other replies until that user has made
  // an initial reply. Defaults to false.
  require_initial_post: boolean,

  // Whether or not posts in this topic are visible to the user.
  user_can_see_posts: boolean,

  // The count of entries in the topic.
  discussion_subentry_count: number,

  // The read_state of the topic for the current user, 'read' or 'unread'.
  read_state: "read" | "unread",

  // The count of unread entries of this topic for the current user.
  unread_count: number,

  // Whether or not the current user is subscribed to this topic.
  subscribed: boolean,

  // (Optional) Why the user cannot subscribe to this topic. Only one reason will
  // be returned even if multiple apply. Can be one of: 'initial_post_required':
  // The user must post a reply first; 'not_in_group_set': The user is not in the
  // group set for this graded group discussion; 'not_in_group': The user is not
  // in this topic's group; 'topic_is_announcement': This topic is an announcement
  subscription_hold?:
  | "initial_post_required"
  | "not_in_group_set"
  | "not_in_group"
  | "topic_is_announcement",

  // The unique identifier of the assignment if the topic is for grading,
  // otherwise null.
  assignment_id?: number,

  // The datetime to publish the topic (if not right away).
  delayed_post_at?: DateString,

  // Whether this discussion topic is published (true) or draft state (false)
  published: boolean,

  // The datetime to lock the topic (if ever).
  lock_at?: DateString,

  // Whether or not the discussion is 'closed for comments'.
  locked: boolean,

  // Whether or not the discussion has been 'pinned' by an instructor
  pinned: boolean,

  // Whether or not this is locked for the user.
  locked_for_user: boolean,

  // (Optional) Information for the user about the lock. Present when
  // locked_for_user is true.
  lock_info?: boolean,

  // (Optional) An explanation of why this is locked for the user. Present when
  // locked_for_user is true.
  lock_explanation?: string,

  // The username of the topic creator.
  user_name: string,

  // DEPRECATED An array of topic_ids for the group discussions the user is a part
  // of.
  topic_children: number[],

  // An array of group discussions the user is a part of. Fields include: id,
  // group_id
  group_topic_children: {id: number, group_id: number}[],

  // If the topic is for grading and a group assignment this will point to the
  // original topic in the course.
  //
  root_topic_id?: number,
  // If the topic is a podcast topic this is the feed url for the current user.
  //
  podcast_url?: URLString,
  // The type of discussion. Values are 'side_comment', for discussions that only
  // allow one level of nested comments, and 'threaded' for fully threaded
  // discussions.
  discussion_type: "side_comment" | "threaded",

  // The unique identifier of the group category if the topic is a group
  // discussion, otherwise null.
  group_category_id?: number,

  // Array of file attachments.
  attachments?: FileAttachment[],

  // The current user's permissions on this topic.
  permissions: {attach: boolean},

  // Whether or not users can rate entries in this topic.
  allow_rating: boolean,

  // Whether or not grade permissions are required to rate entries.
  only_graders_can_rate: boolean,

  // Whether or not entries should be sorted by rating.
  sort_by_rating: boolean
}

export interface FileAttachment {
  "content-type": string,
  url: URLString,
  filename: FileNameString,
  display_name: FileNameString
}

export interface Conversation {
  // the unique identifier for the conversation.
  id: number,

  // the subject of the conversation.
  subject: string,

  // The current state of the conversation (read, unread or archived).
  workflow_state: "unread" | "read" | "archived",

  // A <=100 character preview from the most recent message.
  last_message: string,

  // the date and time at which the last message was sent.
  start_at: DateString,

  // the number of messages in the conversation.
  message_count: number,

  // whether the current user is subscribed to the conversation.
  subscribed: boolean,

  // whether the conversation is private.
  private: boolean,

  // whether the conversation is starred.
  starred: boolean,

  // Additional conversation flags (last_author, attachments, media_objects). Each
  // listed property means the flag is set to true (i.e. the current user is the
  // most recent author, there are attachments, or there are media objects)
  properties?: "last_author" | "attachments" | "media_objects",

  // Array of user ids who are involved in the conversation, ordered by
  // participation level, then alphabetical. Excludes current user, unless this is
  // a monologue.
  audience?: number[],

  // Most relevant shared contexts (courses and groups) between current user and
  // other participants. If there is only one participant, it will also include
  // that user's enrollment(s)/ membership type(s) in each course/group.
  audience_contexts: {
    courses: {
      [id: string]: string[]
    },
    groups: {
      [id: string]: string[]
    }
  },

  // URL to appropriate icon for this conversation (custom, individual or group
  // avatar, depending onaudience).
  avatar_url: URLString,

  // Array of users participating in the conversation. Includes current user.
  participants?: ConversationParticipant[],

  // indicates whether the conversation is visible under the current scope and
  // filter. This attribute is always true in the index API response, and is
  // primarily useful in create/update responses so that you can know if the
  // record should be displayed in the UI. The default scope is assumed, unless a
  // scope or filter is passed to the create/update API call.
  visible: boolean,

  // Name of the course or group in which the conversation is occurring.
  context_name: string
}

export interface ConversationParticipant {
  // The user ID for the participant.
  id: number,

  // A short name the user has selected, for use in conversations or other less
  // formal places through the site.
  name: string,

  // The full name of the user.
  full_name: string,

  // If requested, this field will be included and contain a url to retrieve the
  // user's avatar.
  avatar_url?: URLString
}

export interface ExternalToolTagAttributes {
  // URL to the external tool
  url: URLString,

  // Whether or not there is a new tab for the external tool
  new_tab: boolean,

  // the identifier for this tool_tag
  resource_link_id: string,
}

export interface LookInfo {
  // Asset string for the object causing the lock
  asset_string: string,

  // (Optional) Time at which this was/will be unlocked. Must be before the due
  // date.
  unlock_at?: DateString,
  // (Optional) Time at which this was/will be locked. Must be after the due date.
  lock_at: DateString,

  // (Optional) Context module causing the lock.
  context_module?: string,

  manually_locked: boolean
}

export interface RubricRating {
  points: number,

  id: string,

  description: string,

  long_description: string,
}

export interface RubricCriteria {
  points: number,

  // The id of rubric criteria.
  id: string,

  // (Optional) The id of the learning outcome this criteria uses, if any.
  learning_outcome_id?: string,

  // (Optional) The 3rd party vendor's GUID for the outcome this criteria
  // references, if any.
  vendor_guid?: string,

  description: string,

  long_description: string,

  criterion_use_range: boolean,

  ratings?: string,

  ignore_for_scoring: boolean
}

export interface AssignmentDate {
  // (Optional, missing if 'base' is present) id of the assignment override this
  // date represents
  id?: number,

  // (Optional, present if 'id' is missing) whether this date represents the
  // assignment's or quiz's default due date
  base?: boolean,

  title: string,
  // The due date for the assignment. Must be between the unlock date and the lock
  // date if there are lock dates
  due_at: DateString,

  // The unlock date for the assignment. Must be before the due date if there is a
  // due date.
  unlock_at: DateString,

  // The lock date for the assignment. Must be after the due date if there is a
  // due date.
  lock_at: DateString,
}

export interface TurnitinSettings {
  originality_report_visibility:
  | "after_grading"
  | "immediate"
  | "after_due_date"
  | "never",
  s_paper_check: boolean,
  internet_check: boolean,
  journal_check: boolean,
  exclude_biblio: boolean,
  exclude_quoted: boolean,
  exclude_small_matches_type?: "percent" | "words",
  exclude_small_matches_value: 50
}

export interface NeedsGradingCount {
  // Used by Assignment model
  // The section ID
  section_id: string,
  // Number of submissions that need grading
  needs_grading_count: number
}

export interface Assignment {
  // the ID of the assignment
  id: number,

  // the name of the assignment
  name: string,

  // the assignment description, in an HTML fragment
  description: HTMLString,

  // The time at which this assignment was originally created
  created_at: DateString,

  // The time at which this assignment was last modified in any way
  updated_at: DateString,

  // the due date for the assignment. returns null if not present. NOTE: If this
  //
  // assignment has assignment overrides, this field will be the due date as it
  // applies to the user requesting information from the API.
  due_at: DateString,

  // the lock date (assignment is locked after this date). returns null if not
  // present. NOTE: If this assignment has assignment overrides, this field will
  //
  // be the lock date as it applies to the user requesting information from the
  // API.
  lock_at: DateString,

  // the unlock date (assignment is unlocked after this date) returns null if not
  // present NOTE: If this assignment has assignment overrides, this field will be
  //
  // the unlock date as it applies to the user requesting information from the
  // API.
  unlock_at: DateString,

  // whether this assignment has overrides
  has_overrides: boolean,

  // (Optional) all dates associated with the assignment, if applicable
  all_dates: null,

  // the ID of the course the assignment belongs to
  course_id: number,

  // the URL to the assignment's web page
  html_url: URLString,

  // the URL to download all submissions as a zip
  submissions_download_url: URLString,

  // the ID of the assignment's group
  assinment_group_id: number,

  // Boolean flag indicating whether the assignment requires a due date based on
  // the account level setting
  due_date_required: boolean,

  // Allowed file extensions, which take effect if submission_types includes
  // 'online_upload'. ["docx", 'pptx']
  allowed_extensions: string[],

  // An integer indicating the maximum length an assignment's name may be
  max_name_length: number,

  // Boolean flag indicating whether or not Turnitin has been enabled for the
  // assignment. NOTE: This flag will not appear unless your account has the
  //
  // Turnitin plugin available
  turnitin_enabled: boolean,

  // Boolean flag indicating whether or not VeriCite has been enabled for the
  // assignment. NOTE: This flag will not appear unless your account has the
  //
  // VeriCite plugin available
  vericite_enabled: boolean,

  // Settings to pass along to turnitin to control what kinds of matches should be
  // considered. originality_report_visibility can be 'immediate',
  // 'after_grading', 'after_due_date', or 'never' exclude_small_matches_type can
  // be null, 'percent', 'words' exclude_small_matches_value: - if type is null,
  //
  // this will be null also - if type is 'percent', this will be a number between
  // 0 and 100 representing match size to exclude as a percentage of the document
  // size. - if type is 'words', this will be number > 0 representing how many
  // words a match must contain for it to be considered NOTE: This flag will not
  //
  // appear unless your account has the Turnitin plugin available
  turnitin_settings: null,

  // If this is a group assignment, boolean flag indicating whether or not
  // students will be graded individually.
  grade_group_students_individually: boolean,

  // (Optional) assignment's settings for external tools if submission_types
  // include 'external_tool'. Only url and new_tab are included (new_tab defaults
  // to false).  Use the 'External Tools' API if you need more information about
  // an external tool.
  external_tool_tag_attributes: null,

  // Boolean indicating if peer reviews are required for this assignment
  peer_reviews: boolean,

  // Boolean indicating peer reviews are assigned automatically. If false, the
  // teacher is expected to manually assign peer reviews.
  automatic_peer_reviews: boolean,

  // Integer representing the amount of reviews each user is assigned. NOTE: This
  //
  // key is NOT present unless you have automatic_peer_reviews set to true.
  peer_review_count: number,

  // String representing a date the reviews are due by. Must be a date that occurs
  // after the default due date. If blank, or date is not after the assignment's
  // due date, the assignment's due date will be used. NOTE: This key is NOT
  //
  // present unless you have automatic_peer_reviews set to true.
  peer_reviews_assign_at: DateString,

  // Boolean representing whether or not members from within the same group on a
  // group assignment can be assigned to peer review their own group's work
  intra_group_peer_reviews: boolean,

  // The ID of the assignment’s group set, if this is a group assignment. For
  // group discussions, set group_category_id on the discussion topic, not the
  // linked assignment.
  group_category_id: number,

  // if the requesting user has grading rights, the number of submissions that
  // need grading.
  needs_grading_count: number,

  // if the requesting user has grading rights and the
  // 'needs_grading_count_by_section' flag is specified, the number of submissions
  // that need grading split out by section. NOTE: This key is NOT present unless
  //
  // you pass the 'needs_grading_count_by_section' argument as true.  ANOTHER
  // NOTE: it's possible to be enrolled in multiple sections, and if a student is
  //
  // setup that way they will show an assignment that needs grading in multiple
  // sections (effectively the count will be duplicated between sections)
  needs_grading_count_by_section: {
    section_id: string,
    needs_grading_count: number
  }[],

  // the sorting order of the assignment in the group
  position: number,

  // (optional, present if Sync Grades to SIS feature is enabled)
  post_to_sis?: boolean,

  // (optional, Third Party unique identifier for Assignment)
  integration_id?: string,

  // (optional, Third Party integration data for assignment)
  integration_data?: any,

  // the maximum points possible for the assignment
  points_possible: number,

  // the types of submissions allowed for this assignment list containing one or
  // more of the following: 'discussion_topic', 'online_quiz', 'on_paper', 'none',
  //
  // 'external_tool', 'online_text_entry', 'online_url', 'online_upload'
  // 'media_recording'
  submission_types: (
    | "online_quiz"
    | "none"
    | "on_paper"
    | "discussion_topic"
    | "external_tool"
    | "online_upload"
    | "online_text_entry"
    | "online_url"
    | "media_recording")[],

  // If true, the assignment has been submitted to by at least one student
  has_submitted_submissions: boolean,

  // The type of grading the assignment receives; one of 'pass_fail', 'percent',
  // 'letter_grade', 'gpa_scale', 'points'
  grading_type:
  | "points"
  | "pass_fail"
  | "percent"
  | "letter_grade"
  | "gpa_scale"
  | "points"
  | "not_graded"

  // The id of the grading standard being applied to this assignment. Valid if
  // grading_type is 'letter_grade' or 'gpa_scale'.
  grading_standard_id?: number,

  // Whether the assignment is published
  published: boolean,

  // Whether the assignment's 'published' state can be changed to false. Will be
  // false if there are student submissions for the assignment.
  unpublishable: boolean,

  // Whether the assignment is only visible to overrides.
  only_visible_to_overrides: boolean,

  // Whether or not this is locked for the user.
  locked_for_user: boolean,

  // (Optional) Information for the user about the lock. Present when
  // locked_for_user is true.
  lock_info?: string,

  // (Optional) An explanation of why this is locked for the user. Present when
  // locked_for_user is true.
  lock_explanation: string,

  // (Optional) id of the associated quiz (applies only when submission_types is
  // ['online_quiz'])
  quiz_id?: number,

  // (Optional) whether anonymous submissions are accepted (applies only to quiz
  // assignments)
  anonymous_submissions: boolean,

  // (Optional) the DiscussionTopic associated with the assignment, if applicable
  discussion_topic?: string,

  // (Optional) Boolean indicating if assignment will be frozen when it is copied.
  // NOTE: This field will only be present if the AssignmentFreezer plugin is
  //
  // available for your account.
  freeze_on_copy: boolean,

  // (Optional) Boolean indicating if assignment is frozen for the calling user.
  // NOTE: This field will only be present if the AssignmentFreezer plugin is
  //
  // available for your account.
  frozen: boolean,

  // (Optional) Array of frozen attributes for the assignment. Only account
  // administrators currently have permission to change an attribute in this list.
  // Will be empty if no attributes are frozen for this assignment. Possible
  // frozen attributes are: title, description, lock_at, points_possible,
  //
  // grading_type, submission_types, assignment_group_id, allowed_extensions,
  // group_category_id, notify_of_update, peer_reviews NOTE: This field will only
  //
  // be present if the AssignmentFreezer plugin is available for your account.
  frozen_attributes?: (
    | "title" | "description" | "lock_at" | "points_possible" | "grading_type" |
    "submission_types" | "assignment_group_id" | "allowed_extensions" |
    "group_category_id" | "notify_of_update" | "peer_reviews")[],

  // (Optional) If 'submission' is included in the 'include' parameter, includes a
  // Submission object that represents the current user's (user who is requesting
  // information from the api) current submission for the assignment. See the
  // Submissions API for an example response. If the user does not have a
  // submission, this key will be absent.
  submission?: Submission,

  // (Optional) If true, the rubric is directly tied to grading the assignment.
  // Otherwise, it is only advisory. Included if there is an associated rubric.
  use_rubric_for_grading: boolean,

  // (Optional) An object describing the basic attributes of the rubric, including
  // the point total. Included if there is an associated rubric.
  rubric_settings: string,

  // (Optional) A list of scoring criteria and ratings for each rubric criterion.
  // Included if there is an associated rubric.
  rubric?: RubricCriteria,

  // (Optional) If 'assignment_visibility' is included in the 'include' parameter,
  // includes an array of student IDs who can see this assignment.
  assignment_visibility?: number[],

  // (Optional) If 'overrides' is included in the 'include' parameter, includes an
  // array of assignment override objects.
  overrides?: AssignmentOverride[],

  // (Optional) If true, the assignment will be omitted from the student's final
  // grade
  omit_from_final_grade?: boolean,

  // Boolean indicating if the assignment is moderated.
  moderated_grading: boolean,

  // The maximum number of provisional graders who may issue grades for this
  // assignment. Only relevant for moderated assignments. Must be a positive
  // value, and must be set to 1 if the course has fewer than two active
  // instructors. Otherwise, the maximum value is the number of active instructors
  // in the course minus one, or 10 if the course has more than 11 active
  // instructors.
  grader_count: number,

  // The user ID of the grader responsible for choosing final grades for this
  // assignment. Only relevant for moderated assignments.
  final_grader_id: number,

  // Boolean indicating if provisional graders' comments are visible to other
  // provisional graders. Only relevant for moderated assignments.
  grader_comments_visible_to_graders: boolean,

  // Boolean indicating if provisional graders' identities are hidden from other
  // provisional graders. Only relevant for moderated assignments with
  // grader_comments_visible_to_graders set to true.
  graders_anonymous_to_graders: boolean,

  // Boolean indicating if provisional grader identities are visible to the final
  // grader. Only relevant for moderated assignments.
  grader_names_visible_to_final_grader: boolean,

  // Boolean indicating if the assignment is graded anonymously. If true, graders
  // cannot see student identities.
  anonymous_grading: boolean,

  // The number of submission attempts a student can make for this assignment. -1
  // is considered unlimited.
  allowed_attempts: number,

  // Whether the assignment has manual posting enabled. Only relevant for courses
  // using New Gradebook.
  post_manually: boolean
}

export interface AssignmentOverride {
  // the ID of the assignment override
  id: number,

  // the ID of the assignment the override applies to
  assignment_id: number,

  // the IDs of the override's target students (present if the override targets an
  // ad-hoc set of students)
  student_ids: number[],

  // the ID of the override's target group (present if the override targets a
  // group and the assignment is a group assignment)
  group_id: number,

  // the ID of the overrides's target section (present if the override targets a
  // section)
  course_section_id: number,

  // the title of the override
  title: string,

  // the overridden due at (present if due_at is overridden)
  due_at: DateString,

  // the overridden all day flag (present if due_at is overridden)
  all_day: boolean,

  // the overridden all day date (present if due_at is overridden)
  all_day_date: DateString,

  // the overridden unlock at (present if unlock_at is overridden)
  unlock_at: DateString,

  // the overridden lock at, if any (present if lock_at is overridden)
  lock_at: DateString
}

export interface MediaComment {
  "content-type": MIMETypeString,
  display_name: string,
  media_id: number,
  media_type: string,
  url: URLString
}

export interface SubmissionComment {
  id: number,
  author_id: number,
  author_name: string,

  // Abbreviated user object UserDisplay (see users API).
  author: UserDisplay,

  comment: string,
  created_at: DateString,
  edited_at: DateString,
  media_comment?: MediaComment
}

export interface Submission {
  // The submission's assignment id
  assignment_id: number,

  // The submission's assignment (see the assignments API) (optional)
  assignment?: Assignment,

  // The submission's course (see the course API) (optional)
  course?: Course,

  // This is the submision attempt number.
  attempt: number,

  // The content of the submission, if it was submitted directly in a text field.
  body: string,

  // The grade for the submission, translated into the assignment grading scheme
  // (so a letter grade, for example).
  grade: string,

  // A boolean flag which is false if the student has re-submitted since the
  // submission was last graded.
  grade_matches_current_submission: boolean,

  // URL to the submission. This will require the user to log in.
  html_url: URLString,

  // URL to the submission preview. This will require the user to log in.
  preview_url: URLString,

  // The raw score
  score: number,

  // Associated comments for a submission (optional)
  submission_comments?: SubmissionComment,

  // The types of submission ex:
  // ('online_text_entry'|'online_url'|'online_upload'|'media_recording')
  submission_type:
  | "online_text_entry" | "online_url" | "online_upload" | "media_recording",

  // The timestamp when the assignment was submitted
  submitted_at: DateString,

  // The URL of the submission (for 'online_url' submissions).
  url?: DateString,

  // The id of the user who created the submission
  user_id: number,

  // The id of the user who graded the submission. This will be null for
  // submissions that haven't been graded yet. It will be a positive number if a
  // real user has graded the submission and a negative number if the submission
  // was graded by a process (e.g. Quiz autograder and autograding LTI tools).
  // Specifically autograded quizzes set grader_id to the negative of the quiz id.
  // Submissions autograded by LTI tools set grader_id to the negative of the tool
  // id.
  grader_id: number,

  graded_at: DateString,

  // The submissions user (see user API) (optional)
  user?: User,

  // Whether the submission was made after the applicable due date
  late: boolean,

  // Whether the assignment is visible to the user who submitted the assignment.
  // Submissions where `assignment_visible` is false no longer count towards the
  // student's grade and the assignment can no longer be accessed by the student.
  // `assignment_visible` becomes false for submissions that do not have a grade
  // and whose assignment is no longer assigned to the student's section.
  assignment_visible: boolean,

  // Whether the assignment is excused.  Excused assignments have no impact on a
  // user's grade.
  excused: boolean,

  // Whether the assignment is missing.
  missing: boolean,

  // The status of the submission in relation to the late policy. Can be late,
  // missing, none, or null.
  late_policy_status: "missing" | "none" | "late" | "null",

  // The amount of points automatically deducted from the score by the
  // missing/late policy for a late or missing assignment.
  points_deducted: number,

  // The amount of time, in seconds, that an submission is late by.
  seconds_late: number,

  // The current state of the submission
  workflow_state: "submitted" | "unsubmitted" | "graded" | "pending_review",

  // Extra submission attempts allowed for the given user and assignment.
  extra_attempts: number,

  // A unique short ID identifying this submission without reference to the owning
  // user. Only included if the caller has administrator access for the current
  // account.
  anonymous_id: string,

  // The date this submission was posted to the student, or nil if it has not been
  // posted.
  posted_at: DateString,
}

export interface RolePermissions {
  // Whether the role has the permission
  enabled: boolean,

  // Whether the permission is locked by this role
  locked: boolean,

  // Whether the permission applies to the account this role is in. Only present
  // if enabled is true
  applies_to_self: boolean,

  // Whether the permission cascades down to sub accounts of the account this role
  // is in. Only present if enabled is true
  applies_to_descendants: boolean,

  // Whether the permission can be modified in this role (i.e. whether the
  // permission is locked by an upstream role).
  readonly: boolean,

  // Whether the value of enabled is specified explicitly by this role, or
  // inherited from an upstream role.
  explicit: boolean,

  // The value that would have been inherited from upstream if the role had not
  // explicitly set a value. Only present if explicit is true.
  prior_default: boolean
}

export interface Role {
  // The label of the role.
  label: string,

  // The label of the role. (Deprecated alias for 'label')
  role: string,
  // The role type that is being used as a base for this role. For account-level
  // roles, this is 'AccountMembership'. For course-level roles, it is an
  // enrollment type.
  base_role_type: "AccountMembership" | Enrollment["type"],
  // JSON representation of the account the role is in.
  //
  account: {
    id: number,
    name: string,
    parent_account_id: number,
    root_account_id: number,
    sis_account_id: string
  },
  // The state of the role: 'active', 'inactive', or 'built_in'
  workflow_state: "active" | "inactive" | "built_in",
  // A dictionary of permissions keyed by name (see permissions input parameter in
  // the 'Create a role' API).
  permissions: {
    read_course_content: {
      enabled: boolean,
      locked: boolean,
      readonly: boolean,
      explicit: boolean,
      prior_default: boolean
    },
    read_course_list: {
      enabled: boolean,
      locked: boolean,
      readonly: boolean,
      explicit: boolean
    },
    read_question_banks: {
      enabled: boolean,
      locked: boolean,
      readonly: boolean,
      explicit: boolean,
      prior_default: boolean
    },
    read_reports: {
      enabled: boolean,
      locked: boolean,
      readonly: boolean,
      explicit: boolean
    }
  }
}
