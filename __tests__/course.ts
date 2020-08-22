import {Course} from '../src/wrapper/wrapper';

describe.skip("Test course api", () => {
  jest.setTimeout(20000);
  it("should get course file", async () => {
    const course = await Course.getCourseByUser("self", {
      enrollment_state: "active",
    });
    console.log(course);
    expect(typeof course.length === "number").toBe(true);
  });
});


describe("Course spamming test, test everything connect", () => {
  jest.setTimeout(30000);
  it("Course no side effect", async done => {
    const courses = await Course.getCoursesByUser("self", {
      enrollment_state: "active",
    });
    const course = await Course.getCourse(courses[0].id, []);
    const permission = await Course
      .getCoursePermission(
        course.id,
        ["read_forum", "manage_calendar", "view_jobs"]);
    console.log(permission);
    // console.log(result.get("getCoursesByUser"));

    done();
  });
});
