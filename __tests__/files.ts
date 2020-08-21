import {file} from '../src/wrapper/file';
import fs from 'fs';
import {promisify} from 'util';

describe("Test file api", () => {
  const testDir = './tmpTestDir'
  beforeEach(async () => {
    if (!await (promisify(fs.exists))(testDir)) {
      await (promisify(fs.mkdir))(testDir);
    }
  });

  afterEach(async () => {
    if (await (promisify(fs.exists))(testDir)) {
      await promisify(fs.rmdir)(testDir, {recursive: true});
    }
  })

  it("should download one file", async done => {
    const files = await file.getFiles({});
    const stream = await file.fetchFile(files[0]);
    await file.store(testDir, stream);
    const filename = `${testDir}/${stream.filename}`
    expect(await promisify(fs.exists)(filename)).toBe(true);
    done();
  });

  // this test takes very long time.
  jest.setTimeout(30000);
  it.skip("should download first 3 files, stop in 30000 timeout", async done => {
    const files = await file.getFiles({});

    const streams = file.fetchFiles(files.slice(0, 3));
    for await (const stream of streams) {
      try {
        await file.store(testDir, stream);
        const filename = `${testDir}/${stream.filename}`;
        expect(await promisify(fs.exists)(filename)).toBe(true);
        await (promisify(fs.unlink)(filename));
      } catch (err) {
        console.error(`err on file ${stream.filename}`);
      }
    }
    done();
  });
})

