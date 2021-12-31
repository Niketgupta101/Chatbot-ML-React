import { UPDATE } from "../constants/actionTypes";

const VarReducer = (Vars={ dataId: '1', isTrained: false }, action) => {
    switch (action.type) {
        case UPDATE:
            return action.payload;
        default:
            return Vars;
    }
}

export default VarReducer;