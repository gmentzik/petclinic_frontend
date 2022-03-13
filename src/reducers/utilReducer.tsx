import { UtilReducerActionTypes } from "../actions/actionTypes";


export interface UtilReducerState {
  loading: boolean;
}


const createDefaultState = (): UtilReducerState => ({
  loading: false,
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
    default:
      return state;
  }
};
