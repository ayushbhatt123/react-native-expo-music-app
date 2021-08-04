import { NETWORK } from "../Types/Types";

const NetworkReducer = (state = false, action) => {
    switch(action.type) {

        case NETWORK:
            return action.payload;
        
        default: return state;
    }
};

export default NetworkReducer;