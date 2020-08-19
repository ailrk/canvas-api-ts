# Type driven canvas lms api
A low level strongly typed api wrapped for canvas api.

The most frustrated part of using apis is probably being not sure about what parameter to send and what type the api will response. To fully understand the behavior of an api sometimes requires hours of trails and errors.

This api wrapper is aimed to solve the problem. Your api request and response are backed by the type system and ensure you easier api using experience and type safty.

This api is in it's early age, more apis and tests will be added later one.

## Example
```typescript
import {API, canvas} from 'canvas-api-ts';
async function foo() {
  const result = await canvas<API.FilesAPI.Quota.GetUserQuota>({
    uri: "/api/v1/users/:user_id/files/quota",
    uriParams: {user_id: "self"},
    method: "GET",
    param: null
  });
  console.log(result.quota_used);
}
```
If you are using tsserver, most values in the parameters are super narrowed types and can be autocompleted directly. Request parameter `param` and response type are also typed.

## Currently Supported APIS
- Account
- File
- File Upload
- Announcement
- Conversation
- Course
- User

## Note
The best document is problem the type definition itself. Types in `API` namespace are structured follow the [canvas lms api document](https://canvas.instructure.com/doc/api/index.html), more information can be found there.
