import {fetchFile, getFiles, store} from '../src/wrapper/file';

describe("Test file api", () => {
  it("should download the file", async () => {
    const stream = await fetchFile(getFiles[0]);
    await store('.', stream);
  });
})

