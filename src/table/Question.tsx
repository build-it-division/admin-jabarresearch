import React, { useState } from "react";
import { RootStore } from "../store";
import { useSelector } from "react-redux";
import { InsightAnswer, InsightData, InsightQuestion } from "../store/actions/InsightActionTypes";
import InsightModal from "../componnents/InsightModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline as AddIcon } from "react-icons/io";
import InsightQuestionModal from "../componnents/InsightQuestionModal";
 
export default function Question() {
   
  const InsightState = useSelector((state: RootStore) => state.insight);
  console.log('ini data ',InsightState);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [openInsight, setOpenInsight] = useState(false);
  const [openInsightQuestion, setOpenInsightQuestion] = useState(false);
  const [selectedInsightId, setSelectedInsightId] = useState<number>();

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
              <button className="btn btn-error btn-xs ml-2 text-white" onClick={() => deleteInsight(ins.id)}>Delete</button>
            </div>
            {(ins.insight_questions as unknown as InsightQuestion[])?.map((quest, index) => (
            <div tabIndex={index} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2" key={index}>
              <div className="collapse-title text-md font-medium">
                {quest.content} <span className="text-teal-500">({quest.type})</span>
              </div>
              <div className="collapse-content"> 
                <h3 className="mb-2">Jawaban : </h3>
                {(quest.insight_answers as unknown as InsightAnswer[])?.map((ans, index) => (
                  <h4 key={index} className="px-2 py-2 bg-grey-400 mb-2 border-2 rounded-lg">{ans.content}</h4>
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
      <InsightQuestionModal open={openInsightQuestion} close={() => setOpenInsightQuestion(false)} insight_id={selectedInsightId}/>
    </div>
  );
}