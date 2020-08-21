import {API} from './types';
import * as ResponseType from './responseTypes';
import {Permission} from './permissionTypes';


export type ListRoles = API<
  "/api/v1/accounts/:account_id/roles",
  {account_id: number},
  "GET",
  {account_id: string} &
  Partial<{
    state: ("active" | "inactive")[],
    show_inherited: boolean,
  }>,
  ResponseType.Role>;

export type GetASingleRole = API<
  "/api/v1/accounts/:account_id/roles/:id",
  {account_id: number, id: number},
  "GET",
  {account_id: string, role_id: number} &
  Partial<{role: string}>,
  ResponseType.Role>;

export type CreateANewRole = API<
  "/api/v1/accounts/:account_id/roles",
  {account_id: string},
  "POST",
  Pick<ResponseType.Role, "label"> &
  Partial<
    Pick<ResponseType.Role,
      | "role" | "base_role_type"> &
    Record<Permission,
      {
        explicit: boolean,
        enabled: boolean,
        locked: boolean,
        applies_to_self: boolean,
        applies_to_descendants: boolean,
      }>>
  ,
  ResponseType.Role>;

export type DeactivateARole = API<
  "/api/v1/accounts/:account_id/roles/:id",
  {account_id: number, id: number},
  "DELETE",
  {role_id: number} &
  Partial<{role: string}>,
  ResponseType.Role>;

export type ActivateARole = API<
  "/api/v1/accounts/:account_id/roles/:id/activate",
  {account_id: number, id: number},
  "POST",
  {role_id: number},
  ResponseType.Role>;

export type UploadARole = API<
  "/api/v1/accounts/:account_id/roles/:id",
  {account_id: number, id: number},
  "PUT",
  Partial<Record<ResponseType.Enrollment["type"] & string, {
    explicit: boolean,
    enabled: boolean,
    applies_to_self: boolean,
    applies_to_descendants: boolean,
  }>>,
  ResponseType.Role>;
