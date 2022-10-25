
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Data, {Region, Districts} from '../types';
import CategoryBox from '../componnents/CategoryBox';

const Aspirasi = () => {

    const [dataAspirasi, setAspirasi] = useState<Data | null>(null);
    const [dataRegion, setRegion] = useState<Region[] | []>([]);
    const [dataDistricts, setDistricts] = useState<Districts[] | []>([]);
    const [page, setPage] = useState(1);

    const aspirasiUrl = `https://api.jabarresearch.com/api/aspirasi?page=${page}`;
    const regionUrl = "https://api.jabarresearch.com/api/region";
    const districtUrl = "https://api.jabarresearch.com/api/districts";

    useEffect(() => {
        axios
            .get(aspirasiUrl)
            .then(response => {
                setAspirasi(response.data);
            })
            .catch(ex => {
                ex.response.status === 404
                    ? "Resource Not found"
                    : "An unexpected error has occurred";
            });
        }, [page]);

    useEffect(() => {
      axios
          .get(regionUrl)
          .then(response => {
              setRegion(response.data.cities);
          })
          .catch(ex => {
              ex.response.status === 404
                  ? "Resource Not found"
                  : "An unexpected error has occurred";
          });
      }, []);

      useEffect(() => {
        axios
            .get(districtUrl)
            .then(response => {
                setDistricts(response.data);
            })
            .catch(ex => {
                console.log(ex.response.status);
            });
        }, []);

        const handlePrevPage = () => {
          setPage(page - 1);
        };

        const handleNextPage = () => {
          setPage(page + 1);
        };
  return (
    <> 
      <div className="grid grid-cols-4 gap-4">
        <CategoryBox category='infrastruktur'/>
        <CategoryBox category='ekonomi'/>
        <CategoryBox category='kesehatan'/>
        <CategoryBox category='pendidikan'/>
      </div> 
      <div className='w-full'> 
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
                Bidang
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
                  <img src={`https://api.jabarresearch.com/storage/app/public/gambar/${item.image}`} className="w-36 h-24"/>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {dataRegion?.map((reg, index) => {
                    if(reg.id == item.kota) {
                      return(<span key={index}>{reg.name}</span>);
                    }
                  })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {dataDistricts?.map((dist, index) => {
                    if(dist.id == item.kecamatan) {
                      return(<span key={index}>{dist.name}</span>);
                    }
                  })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {item.bidang}
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
        <div className='w-6/12 mt-4'>
            {page != 1 ? (<span className='px-4 py-2 bg-teal-500 text-white rounded-sm cursor-pointer' onClick={handlePrevPage}>prev</span>) : ''}
            <span className='mx-4'>{page}</span>
            {page != dataAspirasi?.last_page ? (<span className='px-4 py-2 bg-teal-500 text-white rounded-sm cursor-pointer' onClick={handleNextPage}>next</span>) : ''}
        </div>
      </div>
    </>
  );
};

export default Aspirasi;
