import { CounterActionTypes } from '../actions/actionTypes'

export interface CounterState {
  count: number;
  message: string;
}

const createDefaultState = (): CounterState => ({
  count: 10,
  message: "CouncterReducerStateMessage"
});

export const counterReducer = (state: CounterState = createDefaultState(), action: any): CounterState => {
  switch (action.type) {
    case CounterActionTypes.INCREASE_COUNT:
      return {
        ...state,
        count: state.count + 1
      };
    case CounterActionTypes.DECREASE_COUNT:
      return {
        ...state,
        count: state.count > 0 ? state.count - 1 : state.count 
      };
    case CounterActionTypes.RESET_COUNT:
        return {
          ...state,
          count: 0
        };
    default:
      return state;
  }
};


