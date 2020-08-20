import {UserAPI as U} from '../api/types';
import {canvas, Match} from '../request/requestBuidler';


export async function getUserSelf() {
  return canvas<U.ShowUserDetail>({
    uri: "/api/v1/users/:id",
    uriParams: {id: "self"},
    method: "GET",
    param: {include: ["uudi", "last_login"]}
  })
}

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
