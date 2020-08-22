import {Assignment, Course} from '../src/index';


describe("test Assignment", () => {
  it("should show self assignment", async () => {
    const course = (await Course.getCourses({
      enrollment_state: "active",
      enrollment_type: "student"
    }
    ))[0];

    const assignments = await Assignment.getAssignmentsByUser({
      user_id: "self",
      course_id: course.id
    }, {});
    expect(typeof assignments.length === "number").toBe(true);
  });
});
