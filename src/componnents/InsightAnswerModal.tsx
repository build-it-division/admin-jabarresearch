import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
    open: boolean,
    close : () => void,
    idForAnswer : {
        insight_id : number,
        insight_question_id : number
    }
}

const InsightAnswerModal = (props : ModalProps) => {

    const InsightUrl = 'https://api.jabarresearch.com/api/insight/createAnswer';
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const { open, close, idForAnswer } = props;

    console.log(props);

    const [content , setContent] = useState('');
    const [loading, setLoading] =  useState(false);

    const handleInput = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        setLoading(true);
        const formData = new FormData();
    
        formData.append('content', content);
        formData.append('insight_id', JSON.stringify(idForAnswer.insight_id));
        formData.append('insight_question_id', JSON.stringify(idForAnswer.insight_question_id));
        
        if(!token){
            console.log("no token");
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
            await axios.post(InsightUrl, formData)
            .then((response) => {
                console.log(response);
                setLoading(false);
                alert("Input Data Question Berhasil");
                navigate(0);
                close();
    
            }).catch((error) => {
                console.log(error);
            });
        }
        
      };

      function wrapAsyncFunction<ARGS extends unknown[]>(fn: (...args: ARGS) => Promise<unknown>): (...args: ARGS) => void {
        return (...args) => {
          void fn(...args);
        };
      }

if(open){
    return (
        <div className='absolute w-full h-[100vh] top-0 left-0 bg-black bg-opacity-20'>
            <div className='absolute w-4/12 h-72 bg-white top-[40%] left-[35%] p-5 rounded-xl'>
            <form className="form-control w-full" onSubmit={wrapAsyncFunction(handleInput)}>
                <label className="label">
                    <span className="label-text">Masukkan Jawaban</span>
                </label>
                <input type="text" placeholder="ketik disini" className="input input-bordered w-full mb-2 h-10" onChange={(e) => setContent(e.target.value)} value={content}/>
                {loading == false ? (<div className='flex flex-row'>
                    <button className="btn bg-teal-500 border-0 text-white w-2/12 mr-2" type='submit'>Kirim</button>
                    <button className="btn btn-active btn-error text-white w-2/12" onClick={close}>Batal</button>
                </div>) : (<button className="btn btn-square loading" disabled></button>)}
                
            </form>
            </div>
        </div>
    );
} else {
    return(<div></div>);
}
  
};

export default InsightAnswerModal;