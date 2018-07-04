import { SET_AUTH_USER } from "./actionTypes";

export function setAuthUser(id) {
  return {
    type: SET_AUTH_USER,
    id
  };
}
