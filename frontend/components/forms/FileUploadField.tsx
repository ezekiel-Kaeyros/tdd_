import React from 'react';

type Props = {
  id: string;
  fileTypeDescription: string;
  name: string;
  title: string;
  props?: any;
  value?: any;
};

const FileUploadField: React.FC<Props> = ({
  fileTypeDescription,
  id,
  name,
  title,
  props,
  value,
}) => {
  return (
    <>
      <label
        className="block mb-2 textsm4 text-gray-700 font-bold text-gray-90"
        htmlFor={id}
      >
        {title}
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer p-2 bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-300 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        name={name}
        id={id}
        value={value}
        type="file"
        {...props}
        accept={fileTypeDescription}
      />
      <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
        {fileTypeDescription}
      </p>
    </>
  );
};

export default FileUploadField;
