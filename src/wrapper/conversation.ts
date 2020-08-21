import * as C from '../api/conversationAPITypes';
import {canvas, Match} from '../request/requestBuidler';



export async function getConversations(
  config: Match<C.ListConversations, "param">,
) {
  return canvas<C.ListConversations>({
    uri: "/api/v1/conversations",
    uriParams: {},
    method: "GET",
    param: config,
  })
}

export async function createConversation(
  post: Match<C.CreateConversation, "param">,
) {
  return canvas<C.CreateConversation>({
    uri: "/api/v1/conversations",
    uriParams: {},
    method: "POST",
    param: post,
  })
}

export async function deleteConversation(
  conversationId: Match<C.DeleteAConversation, "uriParams">["id"],
  config: Match<C.DeleteAConversation, "param">,
) {
  return canvas<C.DeleteAConversation>({
    uri: "/api/v1/conversations/:id",
    uriParams: {id: conversationId},
    method: "DELETE",
    param: config
  })
}

export async function batchUpdateConversation(
  conversationIds: string[],
  event: Match<C.BatchUpdateConversations, "param">["event"],
) {
  return canvas<C.BatchUpdateConversations>({
    uri: "/api/v1/conversations",
    uriParams: {},
    method: "PUT",
    param: {
      conversation_ids: conversationIds,
      event,
    }
  })
}

export async function unreadConversationsCount() {

  return canvas<C.UnreadCount>({
    uri: "/api/v1/conversations/unread_count",
    uriParams: {},
    method: "GET",
    param: {},
  })

}
