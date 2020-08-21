import {API} from './types';
import * as ResponseType from './responseTypes';
import {Permission} from './permissionTypes';

export type FindRecipients = API<
  "/api/v1/conversations/find_recipients",
  {},
  "GET",
  Partial<{
    search: string,
    context: string,
    exclude: string[],
    type: "user" | "context",
    user_id: number,
    from_conversation_id: number,
    permisions: Permission[],
  }>,
  {
    id: string | number,
    name: string,
    type: "context",
    user_count: number,
  } |
  {
    id: string | number,
    name: string,
    full_name: string,
    common_courses: any[],
    common_groups: any[],
  }[]>;

export type ListAllCourses = API<
  "/api/v1/search/all_courses",
  {},
  "GET",
  Partial<{
    search: string,
    public_only: boolean,
    open_enrollment_only: boolean,
  }>,
  ResponseType.Course[]>;
