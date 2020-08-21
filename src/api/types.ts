import {HTTPMethod} from '../request/types';
import {ResponseType} from './responseTypes';
import {
  DateString,
  MIMETypeString,
  HTMLString,
  URLString,
} from './aliases';

export interface API<
  U extends string,
  UP extends {[key: string]: number | string},
  M extends HTTPMethod,
  P,
  R> {
  // api endpoint
  uri: U,

  // exists only when the endpoint requires parameters.
  uriParams?: UP,

  // HTTP method
  method: M,

  // parameters for GET, or body for POST
  param: P,

  // response type.
  response: R,
};

export type APIKey =
  | "uri"
  | "uriParams"
  | "method"
  | "param"
  | "response";

// API for handling acounts
// source https://canvas.instructure.com/doc/api/accounts.html
export namespace AccountAPI {
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
}

// API for files
// https://canvas.instructure.com/doc/api/files.html
export namespace FilesAPI {
  export namespace Quota {
    export type GetCourseQuota = API<
      "/api/v1/courses/:course_id/files/quota",
      {course_id: number},
      "GET",
      {},
      {quota: number, quota_used: number}>;

    export type GetGroupQuota = API<
      "/api/v1/groups/:group_id/files/quota",
      {group_id: number},
      "GET",
      {},
      {quota: number, quota_used: number}>;

    export type GetUserQuota = API<
      "/api/v1/users/:user_id/files/quota",
      {user_id: number | "self"},
      "GET",
      {},
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
      {course_id: number},
      "GET",
      Partial<ListParam>,
      ResponseType.File[]>;

    export type GetUserList = API<
      "/api/v1/users/:user_id/files",
      {user_id: number | "self"},
      "GET",
      Partial<ListParam>,
      ResponseType.File[]>;

    export type GetGroupList = API<
      "/api/v1/groups/:group_id/files",
      {group_id: number},
      "GET",
      Partial<ListParam>,
      ResponseType.File[]>;

    export type GetFolderList = API<
      "/api/v1/folders/:id/files",
      {id: number},
      "GET",
      Partial<ListParam>,
      ResponseType.File[]>;
  }

  export namespace GetFile {
    export type GetFile = API<
      "/api/v1/files/:id",
      {id: number},
      "GET",
      Partial<{include: ("user" | "usage_rights")[]}>,
      ResponseType.File>;

    export type GetFilePost = API<
      "/api/v1/files/:id",
      {id: number},
      "POST",
      Partial<{include: ("user" | "usage_rights")[]}>,
      ResponseType.File>;

    export type GetCourseFile = API<
      "/api/v1/courses/:course_id/files/:id",
      {course_id: number, id: number},
      "GET",
      Partial<{include: ("user" | "usage_rights")[]}>,
      ResponseType.File>;

    export type GetGroupFile = API<
      "/api/v1/groups/:group_id/files/:id",
      {group_id: number, id: number},
      "GET",
      Partial<{include: ("user" | "usage_rights")[]}>,
      ResponseType.File>;

    export type GetUserFile = API<
      "/api/v1/users/:user_id/files/:id",
      {user_id: number | "self", id: number},
      "GET",
      Partial<{include: ("user" | "usage_rights")[]}>,
      ResponseType.File>;
  }

  export type UpateFile = API<
    "/api/v1/files/:id",
    {id: number},
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
    {id: number},
    "DELETE",
    Partial<{replace: boolean}>,
    ResponseType.File>;

  export type ResetLinkVerifier = API<
    "/api/v1/files/:id/reset_verifier",
    {id: number},
    "POST",
    {},
    ResponseType.File>;

  export type ListFolders = API<
    "/api/v1/folders/:id/folders",
    {id: number},
    "GET",
    {},
    ResponseType.Folder>;

  export namespace ListAllFolders {
    export type ListCourseFolders = API<
      "/api/v1/courses/:course_id/folders",
      {course_id: number},
      "GET",
      {},
      ResponseType.Folder[]>;

    export type ListUserFolders = API<
      "/api/v1/users/:user_id/folders",
      {user_id: number | "self"},
      "GET",
      {},
      ResponseType.Folder[]>;

    export type ListGroupFolders = API<
      "/api/v1/groups/:group_id/folders",
      {group_id: number},
      "GET",
      {},
      ResponseType.Folder[]>;
  }

  export namespace ResolvePath {
    export type Course = API<
      "/api/v1/courses/:course_id/folders/by_path/*full_path",
      {course_id: number, full_path: string | ""},
      "GET",
      {},
      ResponseType.Folder[]>;

    export type User = API<
      "/api/v1/users/:user_id/folders/by_path/*full_path",
      {user_id: number | "self", full_path: string | ""},
      "GET",
      {},
      ResponseType.Folder[]>;

    export type Group = API<
      "/api/v1/groups/:group_id/folders/by_path/*full_path",
      {group_id: number, full_path: string},
      "GET",
      {},
      ResponseType.Folder[]>;
  }

  export namespace GetFoler {
    export type Course = API<
      "/api/v1/courses/:course_id/folders/:id",
      {course_id: number, id: string},
      "GET",
      {},
      ResponseType.Folder>;

    export type User = API<
      "/api/v1/users/:user_id/folders/:id",
      {user_id: number | "self", id: number},
      "GET",
      {},
      ResponseType.Folder>;

    export type Group = API<
      "/api/v1/groups/:group_id/folders/:id",
      {group_id: number, id: number},
      "GET",
      {},
      ResponseType.Folder>;

    export type Folder = API<
      "/api/v1/folders/:id",
      {id: number},
      "GET",
      {},
      ResponseType.Folder>;
  }

  export type UpdateFoler = API<
    "/api/v1/folders/:id",
    {id: number},
    "PUT",
    Partial<{
      name: string,
      parent_folder_id: string,
      lock_at: DateString,
      unlock_at: DateString,
      locked: boolean,
      hidden: boolean,
      position: boolean,
    }>,
    ResponseType.Folder>;

  export namespace CreateFoler {
    type CreateFolerParam = {
      name: string,
    } & Partial<{
      parent_folder_id: string,
      parent_folder_path: string,
      lock_at: DateString,
      unlock_at: DateString,
      locked: boolean,
      hidden: boolean,
      position: number,
    }>;

    export type Course = API<
      "/api/v1/courses/:course_id/folders",
      {course_id: number},
      "POST",
      CreateFolerParam,
      ResponseType.Folder>;

    export type User = API<
      "/api/v1/users/:user_id/folders",
      {user_id: number | "self"},
      "POST",
      CreateFolerParam,
      ResponseType.Folder>;

    export type Group = API<
      "/api/v1/groups/:group_id/folders",
      {group_id: number},
      "POST",
      CreateFolerParam,
      ResponseType.Folder>;

    export type Folder = API<
      "/api/v1/folders/:folder_id/folders",
      {folder_id: number},
      "POST",
      CreateFolerParam,
      ResponseType.Folder>;
  }

  export type DeleteFolder = API<
    "/api/v1/folders/:id",
    {id: number},
    "DELETE",
    Partial<{force: boolean}>,
    any>;

  export type UploadAFile = API<
    "/api/v1/folders/:folder_id/files",
    {folder_id: number},
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

  export type CopyAFile = API<
    "/api/v1/folders/:dest_folder_id/copy_file",
    {dest_folder_id: number},
    "POST",
    {
      source_file_id: string
    } & Partial<{on_duplicate: "overwrite" | "rename"}>,
    ResponseType.File>;

  export type CopyAFolder = API<
    "/api/v1/folders/:dest_folder_id/copy_folder",
    {dest_folder_id: number},
    "POST",
    {source_file_id: string},
    ResponseType.Folder>;

  export namespace GetUploadedMediaFolderForUser {
    export type Course = API<
      "/api/v1/courses/:course_id/folders/media",
      {course_id: number},
      "GET",
      {},
      ResponseType.Folder>;

    export type Group = API<
      "/api/v1/groups/:group_id/folders/media",
      {group_id: number},
      "GET",
      {},
      ResponseType.Folder>;
  }

  export namespace SetUsageRights {
    type SetUsageRightsParam = {file_ids: string[]}
      & Partial<{
        folder_ids: string[],
        publish: boolean,
        usage_rights: {
          use_justification: string,
          legal_copyright: string,
          license: string,
        }
      }>;

    export type Course = API<
      "/api/v1/courses/:course_id/usage_rights",
      {course_id: number},
      "PUT",
      SetUsageRightsParam,
      ResponseType.UsageRights>;

    export type Group = API<
      "/api/v1/groups/:group_id/usage_rights",
      {group_id: number},
      "PUT",
      SetUsageRightsParam,
      ResponseType.UsageRights>;

    export type User = API<
      "/api/v1/users/:user_id/usage_rights",
      {user_id: number | "self"},
      "PUT",
      SetUsageRightsParam,
      ResponseType.UsageRights>;
  }

  export namespace RemoveUsageRights {
    type RemoveUsageRightsParam =
      {file_ids: string[]} &
      Partial<{
        folder_ids: string[]
      }>;

    export type User = API<
      "/api/v1/users/:user_id/usage_rights",
      {user_id: number | "self"},
      "DELETE",
      RemoveUsageRightsParam,
      ResponseType.UsageRights>;

    export type Group = API<
      "/api/v1/groups/:group_id/usage_rights",
      {group_id: number},
      "DELETE",
      RemoveUsageRightsParam,
      ResponseType.UsageRights>;

    export type Course = API<
      "/api/v1/courses/:course_id/usage_rights",
      {course_id: number},
      "DELETE",
      RemoveUsageRightsParam,
      ResponseType.UsageRights>;
  }
}

// Canvas fild upload procedure
// First use canvas api to get upload url,
// then post the file to the given url.
// To check if the file is uploaded, use the `Location` entry returned
// from the second request.
// https://canvas.instructure.com/doc/api/file.file_uploads.html
export namespace FileUploadViaPost {
  export type Upload = API<
    // uplaod_url
    URLString,
    {},
    "POST",
    {file: ArrayBuffer} &
    Partial<{
      key: string,
    }> & any,

    // sample respnse:
    // HTTP/1.1 301 Moved Permanently
    // Location: https://<canvas>/api/v1/files/1234/create_success?uuid=ABCDE
    string>;

  export type Confirm = API<
    // Location
    URLString,
    {},
    "POST",
    {},
    {
      id: number,
      url: URLString,
      "content-type": MIMETypeString,
      display_name: string,
      szie: number,
    }>;

  export namespace FileUploadViaURL {
    // TODO
  }
}


// https://canvas.instructure.com/doc/api/announcements.html
export namespace AnnouncementsAPI {
  export type ListAnnoutcements = API<
    "/api/v1/announcements",
    {},
    "GET",
    {context_codes: string[]}
    & Partial<{
      // yyyy-mm-dd or YYYY-MM-DDTHH:MM:SSZ
      start_date: DateString,

      end_date: DateString,

      active_only: boolean,

      include: ("sections" | "sections_user_count")[]

    }>,
    ResponseType.DiscussinoTopic>;
}

export namespace ConversationsAPI {
  export type ListConversations = API<
    "/api/v1/conversations",
    {},
    "GET",
    Partial<{
      scope: "unread" | "starred" | "archived",
      files: string[],
      filter_mode: "and" | "or" | "default or",
      interleave_submissions: boolean,
      include_all_conversation_ids: boolean,
      include: ("participant_avatars" | "participant_url")[],
    }>,
    ResponseType.Conversation>;

  export type CreateConversation = API<
    "/api/v1/conversations",
    {},
    "POST",
    {
      // An array of recipient ids. These may be user ids or course/group ids prefixed
      // with “course_” or “group_” respectively,
      // e.g. recipients[]=1&recipients=2&recipients[]=course_3.
      // If the course/group has over 100 enrollments,
      // 'bulk_message' and 'group_conversation' must be set to true.
      recipients: string[],

      //	The message to be sent
      body: string,
    }
    &
    Partial<{
      subject: string,
      force_new: boolean,
      group_conversation: boolean,
      attachment_ids: string[],
      media_comment_id: string,
      media_comment_type: "audio" | "video",
      user_note: boolean,
      mode: "sync" | "async",
      scope: "unread" | "starred" | "archived",
      filter: string[],
      filter_mode: "and" | "or" | "default or",
      context_code: string,
    }>,
    {}>;

  export type UnreadCount = API<
    "/api/v1/conversations/unread_count",
    {},
    "GET",
    {},
    {unread_count: string}>;

}

export namespace CoursesAPI {
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
      state:
      | "unpublished"
      | "available"
      | "completed"
      | "deleted"
    }>,
    ResponseType.Course[]>;

  export type ListCoursesForAUser = API<
    "/api/v1/users/:user_id/courses",
    {user_id: number | "self"},
    "GET",
    Partial<{
      enrollment_state: "active" | "invited_or_pending" | "completed",
      include: Include,
      state:
      | "unpublished"
      | "available"
      | "completed"
      | "deleted"
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

  export type Permission = API<
    "/api/v1/courses/:course_id/permissions",
    {course_id: number},
    "GET",
    Partial<{permissions: string}>,
    {[permissions: string]: string}>;
}


export namespace UserAPI {
  export type ListUserInAccount = API<
    "/api/v1/accounts/:account_id/users",
    {account_id: number | "self"},
    "GET",
    Partial<{
      search_term: string,
      enrollment_type: ("teacher" | "student" | "ta" | "obserber" | "design")[],
      sort: "username" | "email" | "sis_id" | "last_login",
      order: "asc" | "desc",
    }>,
    ResponseType.User[]>;

  export type ListActivityStream = API<
    "/api/v1/users/self/activity_stream",
    {},
    "GET",
    Partial<{
      only_active_courses: boolean,
    }>,
    {
      created_at: DateString,
      updated_at: DateString,
      id: number,
      title: string,
      message: string,
      type:
      | "DiscussionTopic"
      | "Conversation"
      | "Message"
      | "Submission"
      | "Conference"
      | "Collaboration"
      | "AssessmentRequest",
      read_state: boolean,
      context_type: "course" | "group",
      course_id: number,
      group_id?: number,
      html_url: URLString // URL to the Canvas web UI for this stream item
    } & (

      | {
        type: 'DiscussionTopic',
        discussion_topic_id: number,
        total_root_discussion_entries: number,
        require_initial_post: boolean,
        user_has_posted: boolean,
        root_discussion_entries: {
          [entry: string]: string
        }
      }
      | {
        type: 'Announcement',
        announcement_id: number,
        total_root_discussion_entries: number,
        require_initial_post: boolean,
        user_has_posted: boolean,
        root_discussion_entries: {
          [entry: string]: string
        }
      }
      | {
        type: 'Conversation',
        conversation_id: number,
        private: boolean,
        participant_count: number,
      }
      | {
        type: 'Message',
        message_id: number,
        notification_category: string,
      }
      | {
        type: 'Collaboration',
        collaboration_id: number,
      }
      | {
        type: 'AssessmentRequest',
        assessment_request_id: number
      }
    )>;

  export type UploadAFile = API<
    "/api/v1/users/:user_id/files",
    {user_id: number | "self"},
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

  export type ShowUserDetail = API<
    "/api/v1/users/:id",
    {id: number | "self"},
    "GET",
    Partial<{include: ("uudi" | "last_login")[]}>,
    ResponseType.User> & {
      permissions: {
        can_update_name: boolean,
        can_update_avatar: boolean,
        limit_parent_app_web_access: boolean
      }
    };

  export type GetUesrProfile = API<
    "/api/v1/users/:user_id/profile",
    {user_id: number | "self"},
    "GET",
    {},
    ResponseType.Profile>;

  export type ListUserPageViews = API<
    "/api/v1/users/:user_id/page_views",
    {user_id: number | "self"},
    "GET",
    Partial<{
      start_time: DateString,
      end_time: DateString,
    }>,
    ResponseType.PageView[]>;
}

export namespace Progress {
  export type Query = API<
    "/api/v1/progress/:id",
    {id: number | "self"},
    "GET",
    {},
    ResponseType.Progress>;

  export namespace Assigment {
    type AssignmentParam = Partial<{
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
    }>
    export type DeleteAnAssignment = API<
      "/api/v1/courses/:course_id/assignments/:id",
      {course_id: number, id: number},
      "DELETE",
      {},
      ResponseType.Assignment>;

    export type ListAssignment = API<
      "/api/v1/courses/:course_id/assignments",
      {course_id: number},
      "GET",
      AssignmentParam,
      ResponseType.Assignment[]>;

    export type ListAssignmentByAssignmentGroup = API<
      "/api/v1/courses/:course_id/assignment_groups/:assignment_group_id/assignments",
      {course_id: number, assignment_group_id: number},
      "GET",
      AssignmentParam,
      ResponseType.Assignment[]>;

    export type ListAssignmentForUser = API<
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
      {},
      ResponseType.Assignment>;

  }
}
