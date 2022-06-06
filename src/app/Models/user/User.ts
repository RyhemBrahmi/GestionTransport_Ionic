import { Roles } from '../role/Role';

export interface User {
    uid: string;
    name: string;
    roles: Roles;
  }
