'use client';

import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import XMLConvert from '../../../public/icons/xmlconvert.svg';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { FileContext } from '../context/file.context';
import { BACKEND_URL } from '@/types/backendUrl';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { useAuth } from '@/app/hooks/useAuth';

type Props = {
  filename?: string;
  percentage: number;
};

const LoadingIndicator: React.FC<Props> = () => {
  // Getting users session
  const { user } = useAuth();

  // Context of file Upload
  const { state, dispatch } = useContext(FileContext);

  const [percentage, setPercentage] = useState(0);
  const [caseProcessed, setCaseProcessed] = useState('...');
  let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  async function socketInitializer() {
    let total = 4;
    // let _count = 0;

    socket = io(BACKEND_URL);

    socket.on(`update-progress${user?.email}`, (data) => {
      if (
        data !== 'Generate dummy excel' &&
        data !== 'Generate xml file' &&
        data !== 'build case 3'
      ) {
        setPercentage(percentage + 100 / total);
      }
      setCaseProcessed(data);
      state.fileConverted ? setPercentage(100) : '';
    });
    socket.on(`except-progress${user?.email}`, (data) => {
      notifyError(`Error occured except file ${data}`);
      dispatch({ type: 'CANCEL_CONVERSION', payload: '' });
    });

    socket.on(`except-file${user?.email}`, (data) => {
      setPercentage(0);

      notifyError(`Error occured except file ${data}`);
    });
    socket.on(`process-end${user?.email}`, () => {
      setPercentage(100);
    });
  }

  useEffect(() => {
    socketInitializer();
    state.fileConverted && setPercentage(100);

    if (state.fileConverted) {
      return () => {
        socket?.disconnect();
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage, state.fileConverted]);

  return (
    <div className="flex pt-8 flex-col justify-center items-center">
      <div className="flex w-full justify-between items-baseline mb-1">
        <div className="flex items-center">
          <Image src={XMLConvert} alt="xml file icon" />
          <div className="ml-4  flex flex-col">
            <span className=" text-sm md:text-md  text-blue-700 dark:text-white">
              {state.filename}
            </span>
            <span>{caseProcessed}</span>
          </div>
        </div>

        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {percentage} %
        </span>
      </div>
      <div className="w-full mt-2  bg-gray-200 rounded-full h-2.5 dark:bg-gray-100">
        <div
          className="bg-gray-600 h-2.5 rounded-full"
          style={{
            width: `${percentage}%`,
            transition: 'ease-in-out',
            transitionDuration: '200',
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
