export interface AnotherState {
  count: number;
  message: string;
}

const createDefaultState = (): AnotherState => ({
  count: 1,
  message: "AnotherReducerStateMessage"
});

export const anotherReducer = (state: AnotherState = createDefaultState(), action: any): AnotherState => {
  switch (action.type) {
    default:
      return state;
  }
};


