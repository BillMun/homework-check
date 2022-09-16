import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import loggingMiddleware from 'redux-logger'
import { AssignmentReducer, ClassroomReducer, TeacherReducer } from "./Teacher";

const rootReducer = combineReducers({
    teacher:TeacherReducer,
    classrooms:ClassroomReducer,
    assignments:AssignmentReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk, loggingMiddleware))

export default store;