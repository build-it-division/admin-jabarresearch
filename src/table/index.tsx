import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../store";
import { InsightData } from "../store/actions/InsightActionTypes";

interface Result {
  data : {
    email : string,
    Kategori_Insight : string,
    Pertanyaan : string,
    Tipe_Pertanyaan : string,
    Jawaban_Polling : string,
    Jawaban_Essay : string | null,
  }[],
  last_page: number
}


const Table = () => {

  const [result, setResult] = useState<Result>();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');

  const resultUrl = `https://api.jabarresearch.com/api/hasil/insight${category}?page=${page}`;

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleCategory = (e:any) => {
    setPage(1);
    setCategory(e.target.value);
  };

  useEffect(() => {
    axios
        .get(resultUrl)
        .then(response => {
            setResult(response.data);
        })
        .catch(ex => {
            ex.response.status === 404
                ? "Resource Not found"
                : "An unexpected error has occurred";
        });
    }, [page,category]);

    const InsightState = useSelector((state: RootStore) => state.insight);

    console.log(InsightState);
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <div className='w-6/12 mt-4'>
        <div className="mb-3 xl:w-96">
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
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            onChange={(e) => handleCategory(e)}
            >
              <option value=''>All</option>
              {(InsightState?.insight as unknown as InsightData[])?.map((ins, index) => (
                <option value= {`/`+ins.title} key={index}>{ins.title}</option>
              ))}   
          </select>
  </div>
        </div>
        <table className="shadow-md rounded-md table-fixed">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 rounded-tl-md">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
                Kategori Insight
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 rounded-tr-md">
                Pertanyaan
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 rounded-tr-md">
                Tipe Pertanyaan
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 rounded-tr-md">
                Jawaban
              </th>
            </tr>
          </thead>
          <tbody>
            {result?.data?.map((res, index) => (
              <tr className="odd:bg-white even:bg-slate-50" key={index}>
              <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {res.email}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                {res.Kategori_Insight}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                {res.Pertanyaan}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                {res.Tipe_Pertanyaan}
              </td>
                {res.Jawaban_Polling == null ? (<td className="px-6 py-4 text-sm text-slate-900">{res.Jawaban_Essay}</td>) : (<td className="px-6 py-4 text-sm text-slate-900">{res.Jawaban_Polling}</td>)}
            </tr>
            ))}
          </tbody>
        </table>
        <div className='w-6/12 mt-4'>
            {page != 1 ? (<span className='px-4 py-2 bg-teal-500 text-white rounded-sm cursor-pointer' onClick={handlePrevPage}>prev</span>) : ''}
            <span className='mx-4'>{page}</span>
            {page != result?.last_page ? (<span className='px-4 py-2 bg-teal-500 text-white rounded-sm cursor-pointer' onClick={handleNextPage}>next</span>) : ''}
        </div>
      </div>
    </div>
  );
};

export default Table;
