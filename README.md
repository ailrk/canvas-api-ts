# Type driven canvas lms api
A typed api wrapper for canvas lms api.

There is an set of low level interface provides full control over the canvas restful endpoints, and a high level interface that makes things easier.

* This api is in it's early age, more apis and tests will be added later one. Once it is stable it will be a npm package.

The most frustrated part of using apis is probably being not sure about what parameter to send and what kind of value the api will response. It can sometimes take hours of trails and errors just to understand what an api does.

This api wrapper is aimed to solve the problem. Your api request and response are backed by the type system and ensure you easier api using experience and type safty.

## Config
To use the api you first need canvas token. You can find out about how to get one from [here](https://kb.iu.edu/d/aaja)

Once you get the token, create a new file `.env` in your projecet directory, and add following content:

```
CANVAS_API_TOKEN=11824~7jh4ElSYbEdsdlajlsdladTHfyzHMb6xusdahsk0N3HL7xAokxQ9mYC
CANVAS_API_URL=https://canvas.ubc.ca
```

`CANVAS_API_URL` is the domain name of your institution with protocol in the front, `CANVAS_API_TOKEN` is the token you get from canvas website.

If you want to upload your project somewhere __MAKE SURE__ the `.env` file is not also shared. The api token basically gives anyone all the credential of your account.

## Example

#### High level interface
High level interface can be used easily. Functionalities are separated into parts to enable more customizations.
```typescript
import {fetchFile, getFiles, store} from 'canvas-api-ts';

// fille wil be download at the dir
const main = async () => {
  // download the first file
  // getFiles return the representation of file in canvas server.
  // the actual file is stored in a different server and need to be
  // fetched separately.
  const file = (await getFiles())[0];

  // get a stream of file.
  const stream =  await fetchFile(file);

  // write file to current directory.
  await store('.', stream);
};

main();
```
#### Low level interface
Each endpoint is reprensented as a type. call `canvas` with the corresponding type as it's type parameter to send a request. By default your token will be added into the request header. There is also
```typescript
import {API, canvas} from 'canvas-api-ts';
async function foo() {
  const result = await canvas<API.FilesAPI.Quota.GetUserQuota>({
    uri: "/api/v1/users/:user_id/files/quota",
    uriParams: {user_id: "self"},
    method: "GET",
    param: null,
    extra: ...
  });
  console.log(result.quota_used);
}
```
If you are using tsserver, most values in the parameters are super narrowed types and can be autocompleted directly. Request parameter `param` and response type are also typed.

## Convention
`API` is the family of all API types, `*API` is the concrete type represents a canvas api end point. e.g `AccountAPI`.

## Currently Supported APIs
- Account
- File
- File Upload
- Announcement
- Conversation
- Course
- User

## Note
The best document is probably the type definition itself. Types in `API` namespace are structured follow the [canvas lms api document](https://canvas.instructure.com/doc/api/index.html), more information can be found there.

## License
MIT

Be really careful about not sharing your token.
