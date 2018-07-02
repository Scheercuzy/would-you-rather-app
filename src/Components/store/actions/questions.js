import { _saveQuestionAnswer, _saveQuestion } from "../../utils/_DATA";
import { PROGRESS_SAVING, PROGRESS_SAVED } from "./progress";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion(question) {
  return dispatch => {
    dispatch({ type: PROGRESS_SAVING });

    return _saveQuestion(question).then(response => {
      dispatch(addQuestion(response));
      dispatch({ type: PROGRESS_SAVED });
    });
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
  return dispatch => {
    dispatch({ type: PROGRESS_SAVING });

    return _saveQuestionAnswer({ authedUser: authUser, qid, answer })
      .then(() => dispatch(answerQuestion(authUser, qid, answer)))
      .then(() => dispatch({ type: PROGRESS_SAVED }));
  };
}
