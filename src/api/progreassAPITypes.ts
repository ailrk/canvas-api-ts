import {API} from './types';
import * as ResponseType from './responseTypes';

export type Progress = API<
  "/api/v1/progress/:id",
  {id: number | "self"},
  "GET",
  {},
  ResponseType.Progress>;
