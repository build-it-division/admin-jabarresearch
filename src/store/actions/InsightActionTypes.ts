export const LOADING_INSIGHT = "LOADING_INSIGHT";
export const FAIL_INSIGHT = "FAIL_INSIGHT";
export const SUCCESS_INSIGHT = "SUCCESS_INSIGHT";

export type InsightType = {
    insight : InsightData[]
};

export type InsightData = {
    id : number,
    title : string,
    slug : string,
    insight_question : InsightQuestion[]
};

export type InsightQuestion = {
    id : number,
    insight_id : number,
    content : string,
    type : string,
    insight_answer : InsightAnswer[],
    insight_essay? : InsightEssay
};

export type InsightAnswer = {
    id : number,
    insight_id : number,
    insight_question_id : number,
    content : string
};

export type InsightEssay = {
    id : number,
    code : number,
    insight_id : number,
    insight_question_id : number,
    content : string
};

export interface InsightLoading {
    type : typeof LOADING_INSIGHT
}
export interface InsightFail {
    type : typeof FAIL_INSIGHT
}
export interface InsightSuccess {
    type : typeof SUCCESS_INSIGHT,
    payload : {
        insight : InsightData[]
    }
}

export type InsightDispatchTypes = InsightLoading | InsightFail | InsightSuccess;