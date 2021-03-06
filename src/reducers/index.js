import {combineReducers} from 'redux'
import { saveReps } from '../data/'

//*************

const repsReducer = (state = [], action) => {
  let newReps = []
  switch (action.type) {
    case 'ADD_REP':
      let newId = (state.length) ? (Math.max.apply(Math, state.map(function(rep) {return rep.id})) + 1) : 0
      newReps = [
        ...state,
        {
          id: newId,
          name: action.payload.rep.name,
          category: action.payload.rep.category || '[none]',
          tCode: action.payload.rep.tCode
        }
      ]
      if (action.payload.persist)
        saveReps(newReps)
      return newReps

    case 'DELETE_REP':
      let index = state.findIndex(function(rep) {
        return rep.id === action.payload.id
      })
      newReps = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]

      saveReps(newReps)
      return newReps

    case 'RESET_REP':
      newReps = state.map(rep => {
        if (rep.id !== action.payload.id)
          return rep
        else
          return Object.assign({}, rep, {
            tCode: (new Date()).getTime()
          })
      }).slice()
      saveReps(newReps)
      return newReps

    default:
      return state
  }
}

//*************

const sorterReducer = (state = [], action) => {
  switch (action.type) {

    case 'CHANGE_SORTER':
      let newSorter = action.payload
      if (state.hasOwnProperty('isUp')){
        if (newSorter.key === state.key)
          newSorter.isUp = !state.isUp
        else
          newSorter.isUp = state.isUp
      } else {
        newSorter.isUp = false
      }
      return newSorter

    default:
      return state
  }
}

//*************

const filterReducer = (state = [], action) => {
  switch (action.type) {

    case 'CHANGE_FILTER':
      return action.payload

    default:
      return state
  }
}

//*************

const reducers = combineReducers({
  reps: repsReducer,
  sorter: sorterReducer,
  filter: filterReducer
})

export default reducers
