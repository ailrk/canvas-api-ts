import {API} from './types';
import * as ResponseType from './responseTypes';
import {DateString} from './aliases';


// https://canvas.instructure.com/doc/api/announcements.html
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
