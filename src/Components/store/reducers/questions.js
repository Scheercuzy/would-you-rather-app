import { RECEIVE_QUESTIONS, ANSWER_QUESTION } from "../actions/questions";

export default function questions(state = [], action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWER_QUESTION:
      const { authUser, qid, answer } = action;
      const currentQuestion = state[qid];
      return {
        ...state,
        [qid]: {
          ...currentQuestion,
          optionOne: {
            ...currentQuestion.optionOne,
            votes:
              answer === "optionOne"
                ? currentQuestion.optionOne.votes
                    .filter(user => authUser !== user)
                    .concat(authUser)
                : currentQuestion.optionOne.votes.filter(
                    user => authUser !== user
                  )
          },
          optionTwo: {
            ...currentQuestion.optionTwo,
            votes:
              answer === "optionTwo"
                ? currentQuestion.optionTwo.votes
                    .filter(user => authUser !== user)
                    .concat(authUser)
                : currentQuestion.optionTwo.votes.filter(
                    user => authUser !== user
                  )
          }
        }
      };
    default:
      return state;
  }
}
