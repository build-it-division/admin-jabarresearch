import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface CategoryProps {
    category : string
}
interface Data {
    result : number,
    jumlah_data : number
}
const CategoryBox = (props : CategoryProps) => {

    const { category } = props;
    const CategoryUrl = `https://api.jabarresearch.com/api/aspirasi/count/${category}`;

    const [data, setData] = useState<Data>({
        result:0,
        jumlah_data:0,
    }); 

    useEffect(() => {
        axios
            .get(CategoryUrl)
            .then(response => {
                setData(response.data);
            })
            .catch(ex => {
                ex.response.status === 404
                    ? "Resource Not found"
                    : "An unexpected error has occurred";
            });
        }, [category]);

  return (
    <div className="shadow-md h-32 bg-white rounded-md p-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
        <span className="text-base font-medium capitalize">{category}</span>
        <span className="bg-cyan-700 rounded text-gray-100 text-xs px-2 py-0.5">
            All Time
        </span>
        </div>
        <div>
        <span className="text-2xl font-medium">{data?.jumlah_data} Aspirasi</span>
        </div>
        <div className="flex text-sm items-center">
        
            {data.result > 50 ? (<span className="text-sm text-red-600 bg-red-100 px-1 py-0.5 rounded-md">{data.result}%</span>) : (<span className="text-sm text-green-600 bg-green-100 px-1 py-0.5 rounded-md">{data.result}%</span>)}
        
        <span className="text-gray-400 ml-2">Tidak Puas</span>
        </div>
    </div>
  );
};

export default CategoryBox;