import * as A from '../api/announcementAPITypes';
import {canvas, Match} from '../request/requestBuidler';



/**
 * @param contextCode List of context_codes to retrieve announcements for
 *        (for example, course_123). Only courses are presently supported.
 *        The call will fail unless the caller has View Announcements permission
 *        in all listed courses.
 * @return DiscussionsTopic
 */
export async function getAnnouncements(
  contextCodes: string[],
  config: Omit<Match<A.ListAnnoutcements, "param">, "context_codes">,
) {
  return canvas<A.ListAnnoutcements>({
    uri: "/api/v1/announcements",
    uriParams: {},
    method: "GET",
    param: {context_codes: contextCodes, ...config},
  })
}
