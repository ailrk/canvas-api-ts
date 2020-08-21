import {API} from './types';
import * as ResponseType from './responseTypes';
import {
  DateString,
  URLString,
  MIMETypeString,
} from './aliases';


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
