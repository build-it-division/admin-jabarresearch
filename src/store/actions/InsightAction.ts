import axios from "axios";
import { Dispatch } from "redux";
import { FAIL_INSIGHT, InsightDispatchTypes, InsightType, LOADING_INSIGHT, SUCCESS_INSIGHT } from "./InsightActionTypes";

export const GetInsight = () => {
    return (dispatch: Dispatch<InsightDispatchTypes>) => {
        dispatch({type: LOADING_INSIGHT});
       axios.get('https://api.jabarresearch.com/api/insight')
       .then(response => {
        const responseAPI = response.data as InsightType;

        dispatch({type:SUCCESS_INSIGHT, payload:responseAPI});
        
       })
       .catch(err => {
        console.log(err);
        dispatch({type:FAIL_INSIGHT});
       });
    };
};