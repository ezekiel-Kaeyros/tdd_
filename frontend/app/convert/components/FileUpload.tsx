'use client';

import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';

import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/components/Button';

import { notify } from '../../../components/notifications/WarningNotification';
import CSVIconUploaded from '../../../public/icons/csv-icon.svg';
import CSVIcon from '../../../public/icons/csvIcon.svg';
import { regexGenerator } from '../actions/get-tsoList';
import { postFile } from '../actions/post-file';
import { FileContext } from '../context/file.context';
import { fileTypeValidator } from '../hooks/fileTypeValidator';
import FileUploadingProgress from './FileUploadingProgress';
import UploadPlaceholder from './UploadPlaceholder';

// Animating button

const dropIn = {
  hidden: {
    y: -100,
    zIndex: -1,
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    zIndex: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 35,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

// drag drop file component
const FileUpload = ({ dragActiv, regexData }: { dragActiv: any, regexData: any}) => {
  const { state, dispatch } = React.useContext(FileContext);
  // Getting users session

  const { user } = useAuth();

  // drag state
  const [dragActive, setDragActive] = React.useState(dragActiv);

  // ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  // const Getting regex from backend data

  const [regex, setRegex] = React.useState<RegExp | undefined>(regexData);

  // Notification

  if (typeof window !== 'undefined') {
    localStorage?.setItem('token', `${user?.token}`);
  }

  React.useEffect(() => {
    const fetchRegex = async () => {
      const reg = await regexGenerator();
      if (reg) return setRegex(reg);
    };

    fetchRegex();
  }, []);

  // handle drag events
  const handleDrag = function (e: any) {

    e.preventDefault();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: any) {
    e.preventDefault();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      dispatch({ type: 'SET_FILE', payload: e?.dataTransfer?.files[0] });
      dispatch({ type: 'FILE_UPLOADED', payload: true });
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e: any) {
    const ext = e.target?.files[0]?.name.split('.').pop();
    const filename = e.target?.files[0]?.name;

    dispatch({ type: 'SET_FILENAME', payload: filename });

    if (user?.role === 0) {
      dispatch({ type: 'SET_FILE', payload: e?.target?.files[0] });
      dispatch({ type: 'FILE_UPLOADED', payload: true });
    } else if (!filename?.includes(user?.tsoAbbreviation)) {
      notify('You are not authorized to upload the file of another TSO');
      dispatch({ type: 'FILE_UPLOADED', payload: false });
    } else if (fileTypeValidator(ext)) {
      notify('File type not valid');
      dispatch({ type: 'FILE_UPLOADED', payload: false });
    } else if (regex?.test(filename) === false) {
      notify('File name not authorized');
      dispatch({ type: 'FILE_UPLOADED', payload: false });
    } else {
      dispatch({ type: 'SET_FILE', payload: e?.target?.files[0] });
      dispatch({ type: 'FILE_UPLOADED', payload: true });
    }

    dispatch({ type: 'SELECT_LANGUAGE', payload: true });
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const launchConversion = () => {

    dispatch({ type: 'CONVERTING', payload: '' });
    const newFile = new FormData();
    const email = user?.email;

    if (state.file) {
      newFile.append('file', state.file);
      postFile(newFile, email, dispatch, state);
    }
  };

  return state.converting ? (
    <FileUploadingProgress filename={state.filename} />
  ) : (
    <div className="w-full">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />

      {/* Display modal for language selection */}

      <form
        id="form-file-upload"
        className="w-full fileUpload items-center flex flex-col"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          className="hidden"
          accept=".csv, .xlsx"
          onChange={handleChange}
        />
        <motion.label
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={
            dragActive
              ? ' relative p-6 mb-4 w-full h-72 hover:bg-green-600 cursor-pointer bg-green-600  flex items-center justify-center border border-dashed border-gray-50 text-white rounded-md'
              : 'relatitve p-6 mb-4 w-full h-72 hover:bg-green-600 cursor-pointer  flex items-center justify-center border border-dashed border-gray-50 text-white bg-greenpale rounded-md'
          }
        >
          <div className="w-full mb-2">
            <UploadPlaceholder />

            <div className="flex pt-16 flex-col justify-center items-center">
              {state.uploaded ? (
                <>
                  <Image
                    className="mb-4"
                    src={CSVIconUploaded}
                    alt="CSV Icon"
                  />
                  <div className="text-xl mb-4 font-bold">{state.filename}</div>
                </>
              ) : (
                <>
                  <Image src={CSVIcon} alt="CSV Icon" />
                  <button
                    className="hover:underline-offset-1 cursor-pointer mt-2"
                    onClick={onButtonClick}
                  >
                    Click to upload a file
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.label>
        {dragActive && (
          <div
            id="drag-file-element"
            className="w-full  h-full absolute rounded top-0 right-0 left-0 bottom-0"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}

        {state.uploaded ? (
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Button variant="primary" onClick={() => {
              launchConversion()
              // window.location.reload();
            }}>
              Generate
            </Button>
          </motion.div>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};

export default FileUpload;
