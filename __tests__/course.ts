import {Course} from '../src/wrapper/wrapper';

describe("Test course api", () => {
  jest.setTimeout(20000);
  it("should get course file", async () => {
    const course = await Course.getCourseByUser("self", {
      enrollment_state: "active",
    });
    expect(typeof course.length === "number").toBe(true);
  });

  it("should list self courses", async () => {
    const courses = await Course.getCourses({
      enrollment_state: "completed",
    });
    console.log(courses);
    expect(typeof courses.length === "number").toBe(true);
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
    // console.log(result.get("getCoursesByUser"));
    expect(typeof permission["view_jobs"] === "boolean").toBe(true);

    done();
  });
});
