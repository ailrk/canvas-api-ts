import {User} from '../src/index';

describe("Test actions need student permission with student permission", () => {
});

describe("Test actions need more than student permission with student permission",
  () => {
    it("Should filed beacuse of the student authorization", async () => {
      const result = await User.getUserPageViews("self");
      // it should fail
      expect((result as any).status === "unauthorized").toBe(true);
    });
  });
