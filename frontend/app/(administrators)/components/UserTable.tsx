'use client';

import React from 'react';

import dynamic from 'next/dynamic';

// import EditSettings from './EditSettings';

type dataType = {
  company: string;
  email: string;
  id: number;
  is_actif: boolean;
  role: number;
  username: string;
};
type Props = {
  data: Array<dataType>;
};

const EditSettings = dynamic(() => import('./EditSettings'), { ssr: false }); 

const UserTable: React.FC<Props> = ({ data }) => {

  const [filter, setFilter] = React.useState<'all' | 'active' | 'inactive'>('all');

  function reorderArrayByIsActive(array: dataType[]) {
    // Use the sort() method to reorder the array based on the "is_actif" key
    array &&
      array?.sort((a, b) => {
        // Convert "is_actif" values to numbers for comparison (true = 1, false = 0)
        const isActiveA = a.is_actif ? 1 : 0;
        const isActiveB = b.is_actif ? 1 : 0;

        // Compare the "is_actif" values to determine the order
        return isActiveB - isActiveA;
      });

    return array;
  }

  function filterArrayByStatus(array: dataType[]) {
    if (filter === 'active') {
      return array.filter(item => item.is_actif);
    }
    if (filter === 'inactive') {
      return array.filter(item => !item.is_actif);
    }
    return array;
  }

  const reorderedArray = reorderArrayByIsActive(data);
  const filteredArray = filterArrayByStatus(reorderedArray);

  return (
    <div className='flex flex-col'>
      <div className="flex justify-end items-center w-full mb-4">
        Filter by Status: 
        <button 
          className={`mx-2 px-4 py-1 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`mx-2 px-4 py-1 rounded-lg ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`mx-2 px-4 py-1 rounded-lg ${filter === 'inactive' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => setFilter('inactive')}
        >
          Inactive
        </button>
      </div>

      <div className="relative  bg-white  flex  justify-center shadow-md sm:rounded-lg">
        
        <table className="w-full text-sm mb-16 text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
                ROLE
              </th>
              <th scope="col" className="px-6 py-3 flex items-center">
                <div>
                  STATUS
                </div>
              </th>
              <th scope="col" className="w-36 px-6 py-3">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredArray?.map((element: dataType) => (
              <tr key={element?.id} className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
                  {element?.username}
                </th>
                <td className="px-6 py-4">{element?.email}</td>
                <td className="px-6 py-4">
                  {element?.role === 1 ? <>Admin</> : <>User</>}
                </td>
                <td className="px-6 py-4">
                  {element?.is_actif ? (
                    <div className="bg-green-600 w-fit rounded-full px-2 text-white">
                      Active
                    </div>
                  ) : (
                    <div className="bg-gray-400 w-fit rounded-full px-2 text-white ">
                      Inactive
                    </div>
                  )}
                </td>
                <td className="px-8 flex w-fit py-4">
                  <EditSettings
                    role={element?.role}
                    id={element?.id}
                    isActive={element?.is_actif}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
