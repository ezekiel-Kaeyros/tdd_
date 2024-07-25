'use client';

import React, { Dispatch, createContext, useReducer } from 'react';

type StateType = {
  uploaded: boolean;
  filename: string;
  file: any;
  converting: boolean;
  loadingPercentage: number;
  regex: RegExp | undefined;
  notificationMessage: string;
  totalCases: number;
  fileConverted: boolean;
  cancelConversion: boolean;
  tipsTour: boolean;
  selectLanguage: boolean;
  isDownloading: boolean;
  messageModalToggle: boolean; 
  messageModaleData: any; 
};

type ActionType = {
  payload: any;
  type: string;
};

const initialState: StateType = {
  uploaded: false,
  filename: '',
  file: null,
  converting: false,
  loadingPercentage: 0,
  regex: undefined,
  notificationMessage: '',
  totalCases: 5,
  fileConverted: false,
  cancelConversion: false,
  tipsTour: false,
  selectLanguage: false,
  isDownloading: false,
  messageModalToggle: false, 
  messageModaleData: "", 
  // messageModaleData: "", 
};

const reducer = (initialState: StateType, action: ActionType) => {
  switch (action.type) {
    case 'FILE_CONVERTED':
      return { ...initialState, fileConverted: true };
    case 'TOGGLE_MESSAGE_WINDOW':
      return { ...initialState, messageModalToggle: true };
    case 'CLOSE_MESSAGE_WINDOW':
      return { ...initialState, messageModalToggle: false };
    case 'INJECT_DATA_IN_MESSAGE_WINDOW':
      return { ...initialState, messageModaleData: action?.payload };
    case 'CANCEL_CONVERSION':
      return {
        ...initialState,
        cancelConversion: true,
        converting: false,
        file: null,
        filename: '',
        uploaded: false,
        fileConverted: false,
      };
    case 'CONVERTING':
      return { ...initialState, converting: true, fileConverted: false };
    case 'SET_FILE':
      return { ...initialState, file: action.payload };
    case 'SET_FILENAME':
      return { ...initialState, filename: action.payload };
    case 'FILE_UPLOADED':
      return { ...initialState, uploaded: action.payload };
    case 'ACTIVATE_TIPS':
      return { ...initialState, tipsTour: action.payload };
    case 'SELECT_LANGUAGE':
      return { ...initialState, selectLanguage: action.payload };
    case 'DOWNLOADING':
      return { ...initialState, isDownloading: action.payload };
    default:
      return initialState;
  }
};

export const FileContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const FileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      <main>{children}</main>
    </FileContext.Provider>
  );
};
