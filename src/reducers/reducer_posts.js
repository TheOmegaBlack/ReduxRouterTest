import _ from 'lodash'
import { FETCH_POSTS, CREATE_POST, FETCH_POST, DELETE_POST } from "../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      // Omit looks at the state object and if it finds the ID specified in action.payload
      // it returns an object without that key:value pair
      return _.omit(state, action.payload)
    case FETCH_POST:
      // Add the ID post to the state, if it already exists, overwrite it
      return { ...state, [action.payload.data.id]: action.payload.data}
    case FETCH_POSTS:
      // Makes an object out of an array of objects, selecting one key as ID
      return _.mapKeys(action.payload.data, 'id')
    default:
      return state
  }
}