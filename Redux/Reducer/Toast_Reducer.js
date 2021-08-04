import { TOAST, CLEAR_TOAST } from "../Types/Types";

const initialState = {
    title: "",
    type: ""
};

const ToastReducer = (state = initialState, action) => {
    switch(action.type) {

        case TOAST:
            return action.payload;

        case CLEAR_TOAST: 
            return initialState;
        
        default: return state;
    }
};

export default ToastReducer;