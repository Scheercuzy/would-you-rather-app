import { RECEIVE_USERS } from "../actions/actionTypes";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}
