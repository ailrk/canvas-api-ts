import {File} from '../src/index';
import fs from 'fs';
import {promisify} from 'util';

describe.skip("Test file api that requires tmp directory", () => {
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
    const files = await File.getFiles({});
    const stream = await File.fetchFile(files[0]);
    await File.store(testDir, stream);
    const filename = `${testDir}/${stream.filename}`
    expect(await promisify(fs.exists)(filename)).toBe(true);
    done();
  });

  // this test takes very long time.
  jest.setTimeout(30000);
  it("should download first 3 files, stop in 30000 timeout", async done => {
    const files = await File.getFiles({});

    const streams = await Promise.all(await File.fetchFiles(files.slice(0, 3)));
    for await (const stream of streams) {
      try {
        await File.store(testDir, stream);
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

describe.skip("Test file api with timeout limit", () => {
  // this is my own file. More robust test is required.
  it("should get all files of a course", async done => {
    let flag = false;
    setTimeout(() => {flag = true;}, 5000);
    const folders = await File.getUserFolders("self");
    const COSC221 = folders.filter(e => e.name.startsWith("COSC 211"))[0];

    const filePromises = await File.fetchAllFromAFolder(COSC221, {});
    const files = await Promise.all(filePromises);

    // flag should still be false
    expect(flag).toBe(false);
    // for (const file of files) {
    //   console.log(file.meta);
    //   await File.store('./ass', file);
    // }
    expect(typeof files.length === "number").toBe(true);
    done();
  });
});

describe("Rough test, make sure no exception", () => {
  jest.setTimeout(30000);
  it.skip("File No Side effect", async done => {
    const getFiles =  await File.getFiles({});
    const getUserFolders = await File.getUserFolders("self");
    const getQuota = await File.getQuota();
    const getFilesOfAFolder = (async () => {
      const folders = await File.getUserFolders("self");
      return await File.getFilesOfAFolder(folders[0].id, {});
    })();

    // console.log(getFiles);
    // console.log(getUserFolders);
    // console.log(getQuota);
    // console.log(getFilesOfAFolder);
    done();
  });

});

describe("Create and delete folder", () => {
  jest.setTimeout(30000);
  it.skip("Create a file", async done => {
    const result = new Map();

    result.set("createFolder", (async () => {
      const folders = await File.getUserFolders("self");
      const folder = folders[0];
      return await File.createFolder(folder.id, {...folder, name: "I named it"});
    })());

    done();
  });

  it.skip("Delete a file", async done => {
    const result = new Map();
    result.set("deleteFolder", (async () => {
      const folders = await File.getUserFolders("self");
      const folder = folders[0];
      const folderToDelete = (await File.getFolders(folder.id))
        .filter(e => e.name === "New Folder")[0].id;
      return await File.deleteFolder(folderToDelete, {})
    })());

    // now it return a pending promise. Need to await againg to get
    // the value. don't know why.
    // console.log(result.get("deleteFolder"))
    done();
  })
});
