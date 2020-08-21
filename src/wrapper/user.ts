import * as U from '../api/userTypes';
import {canvas, Match} from '../request/requestBuidler';
import * as ResponseType from '../api/responseTypes';

export async function getSelf() {
  return canvas<U.ShowUserDetail>({
    uri: "/api/v1/users/:id",
    uriParams: {id: "self"},
    method: "GET",
    param: {include: ["uudi", "last_login"]}
  })
}

export async function getUser(
  userId: Match<U.ShowUserDetail, "uriParams">["id"],
) {
  return canvas<U.ShowUserDetail>({
    uri: "/api/v1/users/:id",
    uriParams: {id: userId},
    method: "GET",
    param: {include: ["uudi", "last_login"]}
  })
}

export async function getUserProfile(
  user: ResponseType.User
): Promise<Match<U.GetUesrProfile, "response">>;
export async function getUserProfile(
  userId: Match<U.GetUesrProfile, "uriParams">["user_id"]
): Promise<Match<U.GetUesrProfile, "response">>;
export async function getUserProfile(
  user:
    | Match<U.GetUesrProfile, "uriParams">["user_id"]
    | ResponseType.User
) {
  const userId = (user as ResponseType.User)?.id ??
    (user as Match<U.GetUesrProfile, "uriParams">["user_id"]);

  return canvas<U.GetUesrProfile>({
    uri: "/api/v1/users/:user_id/profile",
    uriParams: {user_id: userId},
    method: "GET",
    param: {}
  })
}

export async function getUserActivityStream(
  config: Match<U.ListActivityStream, "param">,
) {
  return canvas<U.ListActivityStream>({
    uri: "/api/v1/users/self/activity_stream",
    uriParams: {},
    method: "GET",
    param: config
  });
};

export async function getUserPageViews(
  userId: Match<U.ListUserPageViews, "uriParams">["user_id"],
  period?: [Date, Date],
): Promise<Match<U.ListUserPageViews, "response">>;
export async function getUserPageViews(
  user: ResponseType.User,
  period?: [Date, Date],
): Promise<Match<U.ListUserPageViews, "response">>;
export async function getUserPageViews(
  user:
    | Match<U.ListUserPageViews, "uriParams">["user_id"]
    | ResponseType.User,
  period?: [Date, Date],
) {
  const userId = (user as ResponseType.User)?.id ??
    (user as Match<U.ListUserPageViews, "uriParams">["user_id"]) ?? "self";

  return canvas<U.ListUserPageViews>({
    uri: "/api/v1/users/:user_id/page_views",
    uriParams: {user_id: userId},
    method: "GET",
    param: (() => {
      if (period !== undefined) {
        const [start_time, end_time] = period.map(e => e.toISOString());
        return {start_time, end_time}
      } else return {}
    })()
  })
}

export async function getUsersInAccount(
  accountId: Match<U.ListUserInAccount, "uriParams">["account_id"],
  config: Match<U.ListUserInAccount, "param">
) {
  return canvas<U.ListUserInAccount>({
    uri: "/api/v1/accounts/:account_id/users",
    uriParams: {account_id: accountId},
    method: "GET",
    param: config,
  });
}
