import { FAIL_INSIGHT, InsightDispatchTypes, InsightType, LOADING_INSIGHT, SUCCESS_INSIGHT } from "../actions/InsightActionTypes";

interface DefaultStateI {
    loading: boolean,
    insight?: InsightType
}

const defaultState: DefaultStateI = {
    loading: false
};

const InsightReducer = (state: DefaultStateI = defaultState, action: InsightDispatchTypes) : DefaultStateI => {
    switch(action.type) {
        case FAIL_INSIGHT:
            return {
                loading: false,
            };
        case LOADING_INSIGHT:
            return {
                loading:true,
            };
        case SUCCESS_INSIGHT:
            return {
                loading : false,
                insight: action.payload
            };
        default:
            return state;
    }
};

export default InsightReducer;