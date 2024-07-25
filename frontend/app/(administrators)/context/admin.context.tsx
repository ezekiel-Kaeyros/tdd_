'use client';

import React, { Dispatch, createContext, useReducer } from 'react';

type TSOType = {
  tsoName: string;
  tsoAbbreviation: string;
  tsoLogo: any | null | undefined;
  tsoConfigFile: null | undefined;
  tsoStammdatei: null | undefined;
  tsoAdminName: string;
  tsoAdminPassword: string;
  tsoAdminEmail: string;
  tsoAdminRole: number;
  step: number;
  SuperAdminModal: boolean;
  users: [];
  idToBeUpdated: number;
  refreshData: number;
  SuperAdminModalCreateUser: boolean;
  SuperAdminModalUpdateUser: boolean;
  SuperAdminModalDeleteTSO: boolean;
  SuperAdminConfirmDeleteModal: boolean;
  idToBeDeleted: number;
  selectedIdTSO: number;
  tsoList: any | null;
  currentTSO: currentTSO | null;
  notifications: any;
};

// current TSO type

type currentTSO = {
  company: string;
  email: string;
  id: number;
  logo_path: string;
  stammdatei_file_path: string;
  usersList: [];
  tsoAbbreviation: string;
  company_id: number;
};

type ActionType = {
  payload: any;
  type: string;
};

const initialState: TSOType = {
  tsoName: '',
  tsoAbbreviation: '',
  tsoLogo: null,
  tsoConfigFile: null,
  tsoStammdatei: null,
  tsoAdminName: '',
  tsoAdminPassword: '',
  tsoAdminEmail: '',
  tsoAdminRole: 1,
  step: 1,
  SuperAdminModal: false,
  users: [],
  idToBeUpdated: 0,
  refreshData: 0,
  SuperAdminModalCreateUser: false,
  SuperAdminModalUpdateUser: false,
  SuperAdminConfirmDeleteModal: false,
  SuperAdminModalDeleteTSO: false,
  idToBeDeleted: 0,
  selectedIdTSO: 0,
  tsoList: [],
  currentTSO: null,
  notifications: [],
};

const reducer = (initialState: TSOType, action: ActionType) => {
  switch (action.type) {
    case 'NEXT':
      return { ...initialState, step: 2 };
    case 'PREV':
      return {
        ...initialState,
        step: 1,
      };
    case 'FIRST_SUBMIT':
      return {
        ...initialState,
        tsoName: action?.payload?.tsoName,
        tsoAbbreviation: action?.payload?.tsoAbbreviation,
        tsoLogo: action?.payload?.tsoLogo,
        tsoConfigFile: action?.payload?.tsoConfigFile,
        tsoStammdatei: action?.payload?.tsoStammdateiFile,
      };
    case 'SUBMIT':
      return {
        ...initialState,
        tsoAdminName: action?.payload?.tsoAdminName,
        tsoAdminPassword: action?.payload?.tsoAdminPassword,
        tsoAdminEmail: action?.payload?.tsoAdminEmail,
        tsoAdminRole: action?.payload?.tsoAdminRole,
      };
    case 'SUPER_ADMIN_MODAL':
      return {
        ...initialState,
        SuperAdminModal: action.payload,
      };
    case 'SUPER_ADMIN_MODAL_CREATE_USER':
      return {
        ...initialState,
        SuperAdminModalCreateUser: action.payload,
      };
    case 'SUPER_ADMIN_MODAL_DELETE_TSO':
      return {
        ...initialState,
        SuperAdminModalDeleteTSO: action.payload,
      };
    case 'SUPER_ADMIN_MODAL_UPDATE_USER':
      return {
        ...initialState,
        SuperAdminModalUpdateUser: action.payload,
      };
    case 'CLEAR_FORM':
      return {
        ...initialState,
        tsoName: '',
        tsoAbbreviation: '',
        tsoLogo: null,
        tsoConfigFile: null,
        tsoStammdatei: null,
        tsoAdminName: '',
        tsoAdminPassword: '',
        tsoAdminEmail: '',
        tsoAdminRole: 1,
        step: 1,
        SuperAdminModal: false,
        SuperAdminModalCreateUser: false,
        SuperAdminModalUpdateUser: false,
      };

    case 'GET_USERS':
      return {
        ...initialState,
        users: action?.payload,
      };

    case 'UPDATE_USER':
      return {
        ...initialState,
        idToBeUpdated: action?.payload,
      };

    case 'REFRESH':
      return {
        ...initialState,
        refreshData: initialState?.refreshData + 1,
      };

    case 'DELETE':
      return {
        ...initialState,
        idToBeDeleted: action?.payload,
        SuperAdminConfirmDeleteModal: action.payload,
      };
    case 'ACTIVATE':
      return {
        ...initialState,
        idToBeDeleted: action?.payload,
      };

    case 'SUPER_ADMIN_MODAL_DELETE_USER':
      return {
        ...initialState,
        SuperAdminConfirmDeleteModal: action.payload,
      };

    case 'SELECT_TSO':
      return {
        ...initialState,
        selectedIdTSO: action.payload,
      };

    case 'GET_TSO_LIST':
      return {
        ...initialState,
        tsoList: action.payload,
      };
    case 'GET_CURRENT_TSO':
      return {
        ...initialState,
        currentTSO: action.payload,
      };

    case 'GET_NOTIFICATIONS':
      return {
        ...initialState,
        notifications: action.payload,
      };
    default:
      return initialState;
  }
};

export const SuperAdminContext = createContext<{
  state: TSOType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const SuperAdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SuperAdminContext.Provider value={{ state, dispatch }}>
      {children}
    </SuperAdminContext.Provider>
  );
};
