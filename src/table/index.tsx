import axios from "axios";
import React, { useEffect, useState } from "react";


interface Result {
  data : {
    email : string,
    Kategori_Insight : string,
    Pertanyaan : string,
    Tipe_Pertanyaan : string,
    Jawaban_Polling : string,
    Jawaban_Essay : string | null,
  }[]
}


const Table = () => {

  const resultUrl = 'https://api.jabarresearch.com/api/hasil/insight';
  const [result, setResult] = useState<Result>();

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
    }, []);

    console.log(result);
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
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
      </div>
    </div>
  );
};

export default Table;
