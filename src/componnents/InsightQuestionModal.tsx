import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
    open: boolean,
    close : () => void,
    insight_id : number | undefined,
}

const InsightQuestionModal = (props : ModalProps) => {

    const InsightUrl = 'https://api.jabarresearch.com/api/insight/createQuestion';
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const { open, close, insight_id } = props;

    console.log(props);

    const [content , setContent] = useState('');
    const [type , setType] = useState('polling');
    const [loading, setLoading] =  useState(false);

    const handleType = (e:any) => {
        setType(e.target.value);
    };

    const handleInput = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        setLoading(true);
        const formData = new FormData();
    
        formData.append('content', content);
        formData.append('insight_id', JSON.stringify(insight_id));
        formData.append('type', type);
        
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
                    <span className="label-text">Masukkan Pertanyaan</span>
                </label>
                <input type="text" placeholder="ketik disini" className="input input-bordered w-full max-w-xs mb-2" onChange={(e) => setContent(e.target.value)} value={content}/>
                <label className="label">
                    <span className="label-text">Pilih Tipe Pertanyaan</span>
                </label>
                <select className="form-select appearance-none
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              mb-4
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              onChange={(e) => handleType(e)}
              >
                <option value='polling'>Polling</option>
                <option value='essay'>Essay</option>
            </select>
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

export default InsightQuestionModal;