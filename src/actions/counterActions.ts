import { CounterActionTypes } from '../actions/actionTypes'

export const increaseCount = () => ({
     type: CounterActionTypes.INCREASE_COUNT
})  

export const decreaseCount = () => ({
     type: CounterActionTypes.DECREASE_COUNT
})

export const resetCount = () => ({
     type: CounterActionTypes.RESET_COUNT
})