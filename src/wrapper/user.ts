import {UserAPI as U} from '../api/types';
import {canvas, Match} from '../request/requestBuidler';


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
  userId: Match<U.GetUesrProfile, "uriParams">["user_id"]
) {
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
  userId?: Match<U.ListUserPageViews, "uriParams">["user_id"],
  period?: [Date, Date],
) {
  return canvas<U.ListUserPageViews>({
    uri: "/api/v1/users/:user_id/page_views",
    uriParams: {user_id: userId ?? "self"},
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
