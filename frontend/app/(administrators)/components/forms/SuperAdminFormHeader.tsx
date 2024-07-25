'use client';
import React, { useContext } from 'react';
import { SuperAdminContext } from '../../context/admin.context';

export const SuperAdminFormHeader = () => {
  const { state } = useContext(SuperAdminContext);
  return (
    <ol className="flex items-center justify-between w-full p-3 shadow-lg text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg dark:text-gray-400 sm:text-base  sm:p-4 sm:space-x-4">
      <li
        className={`flex items-center ${
          state.step === 1 ? 'text-greenpale' : ''
        } `}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border   rounded-full shrink-0 ${
            state.step === 1 ? 'border-greenpale' : 'border-gray-500'
          } `}
        >
          1
        </span>
        TSO <span className="hidden sm:inline-flex sm:ml-2">details</span>
        <svg
          className="w-3 h-3 ml-2 sm:ml-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        </svg>
      </li>
      <li
        className={`flex  items-center ${
          state.step === 2 ? 'text-greenpale' : ''
        } `}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border  ${
            state.step === 2 ? 'border-greenpale' : 'border-gray-500'
          }   rounded-full shrink-0 `}
        >
          2
        </span>
        TSO Admin <span className="hidden sm:inline-flex sm:ml-2"></span>
      </li>
    </ol>
  );
};

export default SuperAdminFormHeader;
