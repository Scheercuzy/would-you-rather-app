import { _saveQuestionAnswer } from '../../utils/_DATA'
import { PROGRESS_SAVING, PROGRESS_SAVED } from './progress'

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function answerQuestion(authUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authUser,
    qid,
    answer
  };
}


export function handleAnswerQuestion(authUser, qid, answer) {
  return (dispatch) => {
    dispatch({ type: PROGRESS_SAVING })

    return _saveQuestionAnswer({ authedUser: authUser, qid, answer })
      .then((() => dispatch(answerQuestion(authUser, qid, answer))))
      .then(() => dispatch({ type: PROGRESS_SAVED })) 
  }
}