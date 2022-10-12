
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Data from '../types';

const Aspirasi = () => {

    const aspirasiUrl = "https://api.jabarresearch.com/api/aspirasi?page=1";

    const [dataAspirasi, setAspirasi] = useState<Data>();

    useEffect(() => {
        axios
            .get(aspirasiUrl)
            .then(response => {
                setAspirasi(response.data);
                console.log(response.data);
            })
            .catch(ex => {
                ex.response.status === 404
                    ? "Resource Not found"
                    : "An unexpected error has occurred";
            });
        }, []);
console.log(dataAspirasi?.data);
  return (
    <>
        <table className="w-full mt-6 shadow-md rounded-md">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 rounded-tl-md">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
              Usia
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
              Gambar
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
              Kota/Kabupaten
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
              Kecamatan
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">
              Aspirasi
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 rounded-tr-md">
              Kepuasan
            </th>
          </tr>
        </thead>
        <tbody>
            {dataAspirasi?.data.map((item, index) => (
            <tr className="odd:bg-white even:bg-slate-50" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                {item.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {item.usia}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                image
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {item.kota}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {item.kecamatan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {item.aspirasi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {item.kepuasan}
                </td>
            </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Aspirasi;
