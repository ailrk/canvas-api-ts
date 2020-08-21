import {AccountAPI as A} from '../api/types';
import {CoursesAPI as C} from '../api/types';
import {canvas, Match} from '../request/requestBuidler';
import {getCourses, getCourse} from './course';
import {Unpacked, Selector} from '../utils';


export async function getAccount() {
  return canvas<A.Acounts>({
    uri: "/api/v1/accounts",
    method: "GET",
    param: {},
  });
}

export async function getAccountId() {
  return (await canvas<A.Acounts>({
    uri: "/api/v1/accounts",
    method: "GET",
    param: {},
  })).map(e => e.id);
}

export async function getSubAccount(
  accountId: Match<A.SubAccount, "uriParams">["account_id"],
) {
  return (await canvas<A.SubAccount>({
    uri: "/api/v1/accounts/:account_id/sub_accounts",
    uriParams: {account_id: accountId},
    method: "GET",
    param: {recursive: true},
  }));
}

export async function getCoursesInAccount(
  accountId: Match<A.SubAccount, "uriParams">["account_id"],
  courseOption: Match<C.ListCoursesByAUser, "param">,
) {
  const accounts = await getSubAccount(accountId);
  const courses = await Promise.all(accounts.map(e => getCourses(courseOption, e.id)));
  return ([] as Unpacked<typeof courses>).concat(...courses);
}

export async function getCourseSyllabus<T>(
  courseId: Match<C.GetACourse, "uriParams">["id"],
  selector: Selector<Match<C.GetACourse, "response">, T>,
) {
  const course = await getCourse(courseId, ["syllabus_body", "term"]);
  return selector(course);
}

export async function getCourseSyllabusInAccount<T>(
  accountId: Match<A.SubAccount, "uriParams">["account_id"],
  selector: Selector<Match<C.GetACourse, "response">, T>,
) {
  const courseIds = (await getCoursesInAccount(accountId, {})).map(e => e.id);
  return await Promise.all(courseIds.map(id => getCourseSyllabus(id, selector)))
}
