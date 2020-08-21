import {API} from './types';
import * as ResponseType from './responseTypes';
import {DateString} from './aliases';


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

export type DeleteAConversation = API<
  "/api/v1/conversations/:id",
  {id: number},
  "DELETE",
  {},
  {
    id: number,
    subject: string,
    workflow_state: "unread" | "read" | "archived"
    last_message?: string,
    last_message_at?: DateString,
    message_count: number,
    subscribed: boolean,
    private: boolean,
    starred: boolean,
    properties: ("last_author" | "attachments" | "media_objects")[]
  }>;

export type BatchUpdateConversations = API<
  "/api/v1/conversations",
  {},
  "PUT",
  {
    conversation_ids: string[],
    event: (
      | "mark_as_read"
      | "mark_as_unread"
      | "star" | "unstar" | "archive"
      | "destroy"
    )[]
  },
  ResponseType.Progress>;

export type UnreadCount = API<
  "/api/v1/conversations/unread_count",
  {},
  "GET",
  {},
  {unread_count: string}>;
