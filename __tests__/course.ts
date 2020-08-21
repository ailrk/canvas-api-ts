import {Course} from '../src/wrapper/wrapper';

describe("Test course api", () => {
  it("should get course file", async () => {
    const course = await Course.getCourseByUser("self", {
      enrollment_state: "active",
    });
    expect(typeof course.length === "number").toBe(true);
  });

});
