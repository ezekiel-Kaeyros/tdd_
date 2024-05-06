'use client';

import React from 'react';

type Props = {
  type: string;
  title: string;
  id: string;
  placeholder: string;
  name: string;
  icon?: any;
  props?: any;
  value?: any;
  disabled?: boolean;
};

const InputField: React.FC<Props> = ({
  type,
  icon,
  title,
  name,
  id,
  placeholder,
  props,
  value,
  disabled,
}) => {
  return (
    <>
      <label className="text-sm font-bold text-gray-700" htmlFor={id}>
        {title ? title : ''}
      </label>
      <div className="relative w-full mt-2">
        {icon ? (
          <div className="absolute mr-10 text-gray-400 inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        ) : (
          ''
        )}

        <input
          name={name}
          type={type}
          {...props}
          id={id}
          disabled={disabled}
          value={value}
          className="bg-gray-50 border pl-12 text-2xl focus:outline-none focus:ring-1 sm:text-sm focus:ring-emerald-500 border-gray-300 text-gray-900 rounded-lg block w-full  p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </>
  );
};

export default InputField;
