import { UtilReducerActionTypes } from "../actions/actionTypes";


export interface UtilReducerState {
  loading: boolean;
  navigateToUrl: string;
}

const createDefaultState = (): UtilReducerState => ({
  loading: false,
  navigateToUrl: '',
});

interface ActionType {
  type: string;
  payload: any;
}

export const utilReducer = (state: UtilReducerState = createDefaultState(), action: ActionType): UtilReducerState => {
  switch (action.type) {
    case UtilReducerActionTypes.SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UtilReducerActionTypes.REMOVE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case UtilReducerActionTypes.NAVIGATE_TO:
      return {
        ...state,
        navigateToUrl: action.payload
      };
    case UtilReducerActionTypes.CLEAR_NAVIGATE_TO:
      return {
        ...state,
        navigateToUrl: ''
      };
    default:
      return state;
  }
};
