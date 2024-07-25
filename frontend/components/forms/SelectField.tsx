'use client';
import React from 'react';

import { usePathname } from 'next/navigation';

import { useAuth } from '@/app/hooks/useAuth';

type Props = {
  name: string;
  props: any;
  company?: any;
  type?: string;
  title?: string; 
  companyValue?: string; 
};

type Tso = Object[];

const SelectField: React.FC<Props> = ({
  name,
  props,
  company,
  type, 
  companyValue, 
  title,
}) => {
  const { user } = useAuth();
  const [, setComanies] = React.useState<Tso>();
  const pathname = usePathname();
  const paths = pathname.split('/');

  // React.useEffect(() => {
  //   async function fetchForm() {
  //     await fetch(`${BACKEND_URL}/company/`)
  //       .then((res) => res.json())
  //       .then((result) => setComanies(result?.tso_list));
  //   }

  //   fetchForm();
  //   return () => {
  //     //
  //   };
  // }, []);

  return (
    <>
      {type === 'language' ? (
        <div>
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-bold opacity-80 text-gray-900 "
          >
            {name}
          </label>
          <select
            name={name}
            {...props}
            id={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-greenpale focus:border-greenpale block w-full p-2.5  dark:focus:ring-greenpale dark:focus:border-greenpale"
          >
            {
              <>
                <option value="german">German</option>
                <option value="english">English</option>
              </>
            }
          </select>
        </div>
      ) : !company ? (
        <div>
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-bold opacity-80 text-gray-900 "
          >
            {''}
          </label>
          <select
            name={name}
            {...props}
            id={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-greenpale focus:border-greenpale block w-full p-2.5  dark:focus:ring-greenpale dark:focus:border-greenpale"
          >
            {user?.role === 0 ? (
              <>
                <option value="1">Administrator</option>
                {
                  paths[paths.length - 1] === "users" ? 
                    <option value="2">User</option>
                    :
                    ""
                }
              </>
            ) : (
              <>
                <option defaultValue={2}>User</option>
              </>
            )}
          </select>
        </div>
      ) : (
        <div>
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-bold opacity-80 text-gray-900 "
          >
            {title}
          </label>
          <select
            name={name}
            {...props}
            id={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-greenpale focus:border-greenpale block w-full p-2.5  dark:focus:ring-greenpale dark:focus:border-greenpale"
          >
            {user?.role === 0 ? (
              // <>
              //   <option
              //     value={`${gettingAbbrReverse(paths[2])}`}
              //   >{`${gettingAbbrReverse(paths[2])}`}</option>
              // </>
              <>
                <option
                  value={ companyValue }
                >{ companyValue }</option>
              </>
            ) : (
              <>
                <option defaultValue={user?.company}>{user?.company}</option>
              </>
            )}
          </select>
        </div>
      )}
    </>
  );
};

export default SelectField;
