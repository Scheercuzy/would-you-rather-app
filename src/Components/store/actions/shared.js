import { _getUsers, _getQuestions } from "../../utils/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";

function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]);
}

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(([users, questions]) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}
