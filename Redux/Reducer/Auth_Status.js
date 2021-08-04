import { STATUS } from "../Types/Types";

const AuthStatus = (state=false, action) => {
    switch(action.type) {

        case STATUS:
            return action.payload;

        default: return state;
    }
};

export default AuthStatus;