import React, { useState } from "react";
import { RootStore } from "../store";
import { useSelector } from "react-redux";
import { InsightAnswer, InsightData, InsightQuestion } from "../store/actions/InsightActionTypes";
import InsightModal from "../componnents/InsightModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline as AddIcon } from "react-icons/io";
import { RiDeleteBin2Fill as DeleteIcon } from "react-icons/ri";
import InsightQuestionModal from "../componnents/InsightQuestionModal";
import InsightAnswerModal from "../componnents/InsightAnswerModal";
 
export default function Question() {
   
  const InsightState = useSelector((state: RootStore) => state.insight);
  console.log('ini data ',InsightState);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [openInsight, setOpenInsight] = useState(false);
  const [openInsightAnswer, setOpenInsightAnswer] = useState(false);
  const [openInsightQuestion, setOpenInsightQuestion] = useState(false);
  const [selectedInsightId, setSelectedInsightId] = useState<number>();
  const [idForAnswer, setidForAnswer] = useState({
    insight_id : 0,
    insight_question_id : 0
  });

  const handleQuestionModal = (ins : number) => {
    setSelectedInsightId(ins);
    setOpenInsightQuestion(true);
    window.scrollTo(0, 0);
  };

  console.log(openInsightQuestion);

  const deleteInsight = (id:number) => {

    const deleteInsightUrl = `https://api.jabarresearch.com/api/delete/insight/${id}`;

    if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.post(deleteInsightUrl, {
        _method: 'delete'
      })
      .then( response => {
        console.log(response);
        navigate(0);
      })
      .catch( error => {
        console.log(error.response.data.message);
        if(error.response.status === 401) {
          localStorage.removeItem('token');

          navigate('/signin');
        }
      });
    } else {
      alert('no token');
    }
    
  };

  const deleteInsightQuestion = (id:number) => {

    const deleteInsightUrl = `https://api.jabarresearch.com/api/delete/insight/question/${id}`;

    if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.post(deleteInsightUrl, {
        _method: 'delete'
      })
      .then( response => {
        console.log(response);
        navigate(0);
      })
      .catch( error => {
        console.log(error.response.data.message);
        if(error.response.status === 401) {
          localStorage.removeItem('token');

          navigate('/signin');
        }
      });
    } else {
      alert('no token');
    }
    
  };

  const deleteInsightAnswer = (id:number) => {

    const deleteInsightUrl = `https://api.jabarresearch.com/api/delete/insight/answer/${id}`;

    if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.post(deleteInsightUrl, {
        _method: 'delete'
      })
      .then( response => {
        console.log(response);
        navigate(0);
      })
      .catch( error => {
        console.log(error.response.data.message);
        if(error.response.status === 401) {
          localStorage.removeItem('token');

          navigate('/signin');
        }
      });
    } else {
      alert('no token');
    }
    
  };

  const addAnswer = (insightId : number, questionId : number) => {
    setidForAnswer({
      insight_id : insightId,
      insight_question_id : questionId,
    });
    setOpenInsightAnswer(true);
  };

  console.log(idForAnswer);
 
  return (
    <div className="w-full h-full">
      <div className="mb-4">
        <button className="btn bg-teal-500 border-0" onClick={() => setOpenInsight(true)}>Add New Insight</button>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
      {(InsightState?.insight as unknown as InsightData[])?.map((ins, index) => (
      <div className="w-full bg-white px-4 py-4 rounded-xl" key={index}>
          <div className="text-start">
            <div color="blue-gray" className="mb-2 text-xl font-bold">
              {ins.title}
              <button className="btn btn-error btn-xs ml-2 text-white hover:border-[2px] hover:bg-transparent hover:text-red-500" onClick={() => deleteInsight(ins.id)}>Delete</button>
            </div>
            {(ins.insight_questions as unknown as InsightQuestion[])?.map((quest, index) => (
            <div tabIndex={index} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2" key={index}>
              <div className="collapse-title text-md font-medium">
                {quest.content} <span className="text-teal-500">({quest.type})</span>
              </div>
              <div className="collapse-content"> 
                <div className="flex flex-row">
                  <div className="border-[2px] mr-2 border-red-500 w-[135px] pr-3 h-8 rounded-lg mb-2 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer flex flex-row items-center justify-between"
                    onClick={() => deleteInsightQuestion(quest.id)}
                  >
                    <DeleteIcon className="ml-2"/>
                    <span className="text-xs">Delete Question</span>
                  </div>

                  {quest.type === "polling" ? 
                  (
                  <div 
                    className="border-[2px] border-indigo-700 w-28 pr-3 h-8 rounded-lg mb-2 hover:text-indigo-500 hover:bg-transparent bg-indigo-700 text-white cursor-pointer flex flex-row items-center justify-between"
                    onClick={() => addAnswer(ins.id, quest.id)}
                  >
                    <AddIcon className="ml-2 w-4 h-4"/>
                    <span className="text-xs">Add Answer</span>
                  </div>
                  ) : "" }
                  
                </div>
                <h3 className="mb-2">Jawaban : </h3>
                {(quest.insight_answers as unknown as InsightAnswer[])?.map((ans, index) => (
                  <div key={index} className="px-4 py-2 bg-grey-400 mb-2 border-2 rounded-lg flex flex-row justify-between items-center">
                    <h4>{ans.content}</h4>
                    <div onClick={() => deleteInsightAnswer(ans.id)} className="cursor-pointer">
                      <DeleteIcon className="w-6 h-6 text-red-500"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            ))}
            <div className="w-full h-12 border-[1px] rounded-xl flex flex-row justify-center items-center cursor-pointer text-teal-500 hover:bg-teal-500 hover:text-white" onClick={() => handleQuestionModal(ins.id)}>
                <AddIcon className="w-8 h-8"/>
                <span className="mx-1 font-semibold">Add Question</span>
            </div>
          </div>
        </div>
        ))} 
      </div>
      <InsightModal open={openInsight} close={() => setOpenInsight(false)}/>
      <InsightAnswerModal open={openInsightAnswer} close={() => setOpenInsightAnswer(false)} idForAnswer={idForAnswer}/>
      <InsightQuestionModal open={openInsightQuestion} close={() => setOpenInsightQuestion(false)} insight_id={selectedInsightId}/>
    </div>
  );
}