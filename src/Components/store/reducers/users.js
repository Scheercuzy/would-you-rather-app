import { RECEIVE_USERS } from "../actions/users";
import { ANSWER_QUESTION } from "../actions/questions";

export default function users(state = [], action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ANSWER_QUESTION:
      const currentUser = state[action.authUser];
      return {
        ...state,
        [action.authUser]: {
          ...currentUser,
          answers: {
            ...currentUser.answers,
            [action.qid]: action.answer
          }
        }
      };
    default:
      return state;
  }
}
