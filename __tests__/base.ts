import {getAuth} from '../src/auth/auth';
import * as API from '../src/api/types';
import {canvas} from '../src/request/requestBuidler';

it("Should be able to get .env info", () => {
  const {url, token} = getAuth();

  expect(typeof url === "string" && typeof token === "string").toBe(true);
});

it("Should be able to get account info", async () => {
  const result = await canvas<API.ConversationsAPI.UnreadCount>({
    uri: "/api/v1/conversations/unread_count",
    method: "GET",
    param: {}
  });
  expect(typeof result.unread_count === "number").toBe(true);
});

it("Should be able to get account into", async () => {

});
