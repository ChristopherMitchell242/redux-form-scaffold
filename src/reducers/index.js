import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
	form: formReducer // redux-form expects this to be added EXACTLY like this 
});

export default rootReducer;