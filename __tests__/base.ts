import {getAuth} from '../src/auth/auth';
import * as ConversationAPI from '../src/api/conversationAPITypes';
import * as AccountAPI from '../src/api/accountAPITypes';
import * as CourseAPI from '../src/api/courseAPITypes';
import * as FileAPI from '../src/api/filesAPITypes';
import * as SearchAPI from '../src/api/searchAPITypes';
import * as UserAPI from '../src/api/userTypes';
import {canvas} from '../src/request/requestBuidler';


// test functionalities of the api.
describe("Basic Test Suite, testing api functinoalities", () => {
  it("Should be able to get .env info", () => {
    const {url, token} = getAuth();

    expect(typeof url === "string" && typeof token === "string").toBe(true);
  });

  it("Should be able to get unread counts", async () => {
    const result = await canvas<ConversationAPI.UnreadCount>({
      uri: "/api/v1/conversations/unread_count",
      method: "GET",
      param: {}
    });
    expect(typeof result.unread_count === "string").toBe(true);
  });

  it("Should be able to get account into", async () => {
    const result = await canvas<AccountAPI.Acounts>({
      uri: "/api/v1/accounts",
      method: "GET",
      param: {}
    });
    expect(typeof result.length === "number").toBe(true);
  });

  it("Should be able to get course list", async () => {
    const result = await canvas<CourseAPI.ListMyCourses>({
      uri: "/api/v1/courses",
      method: "GET",
      param: {}
    });
    expect(typeof result.length === "number").toBe(true);
  });

  it("+", async () => {
    const result = await canvas<UserAPI.ShowUserDetail>({
      uri: "/api/v1/users/:id",
      uriParams: {id: "self"},
      method: "GET",
      param: {}
    });
    expect(typeof result.id === "number").toBe(true);
  });

  it("+", async () => {
    const result = await canvas<FileAPI.Quota.GetUserQuota>({
      uri: "/api/v1/users/:user_id/files/quota",
      uriParams: {user_id: "self"},
      method: "GET",
      param: null
    });
    expect(typeof result.quota === "number").toBe(true);
  });

  it("+", async () => {
    const result = await canvas<FileAPI.List.User>({
      uri: "/api/v1/users/:user_id/files",
      uriParams: {user_id: "self"},
      method: "GET",
      param: null
    });
    expect(typeof result.length === "number").toBe(true);
  });
});

it("search", async () => {
  const result = await canvas<SearchAPI.ListAllCourses>({
    uri: "/api/v1/search/all_courses",
    uriParams: {},
    method: "GET",
    param: {search: ""}
  });
  expect(typeof result.length === "number").toBe(true);
})
