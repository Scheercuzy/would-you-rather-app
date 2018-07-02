import { PROGRESS_SAVING, PROGRESS_SAVED } from "../actions/progress";

export default function progress(
  state = { saving: false, loading: false },
  action
) {
  switch (action.type) {
    case PROGRESS_SAVING:
      return {
        ...state,
        saving: true
      };
    case PROGRESS_SAVED:
      return {
        ...state,
        saving: false
      };
    default:
      return state;
  }
}
