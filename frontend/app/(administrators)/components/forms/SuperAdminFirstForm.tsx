'use client';
import { Button } from '@/components/Button';
import FileUploadField from '@/components/forms/FileUploadField';
import InputField from '@/components/forms/InputField';
import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SuperAdminContext } from '../../context/admin.context';
import { notify } from '@/components/notifications/WarningNotification';

export const SuperAdminFirstForm = () => {
  const { state, dispatch } = useContext(SuperAdminContext);
  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(true);

  interface IFormInput {
    tsoName: string;
    tsoAbbreviation: string;
    tsoLogo: any;
    tsoStammdateiFile: any;
  }

  // When user clic on next button

  const { register, handleSubmit, setValue, watch } = useForm<IFormInput>();

  let stammdateiName = watch('tsoStammdateiFile');
  let tsoAbbreviation = watch('tsoAbbreviation');

  if (stammdateiName) {
    if (
      stammdateiName[0]?.name.split('.')[0].toString() !==
      `Stammdatei_mRID_${tsoAbbreviation}`
    ) {
      notify(
        `Stammdatei non valid, must be ${`Stammdatei_mRID_${tsoAbbreviation}`}`
      );
      setValue('tsoStammdateiFile', '');
    }
  }

  const onSubmitFirstForm: SubmitHandler<IFormInput> = (data) => {
    if (
      data.tsoLogo &&
      data.tsoName &&
      data.tsoStammdateiFile &&
      data.tsoAbbreviation
    ) {
      dispatch({ type: 'FIRST_SUBMIT', payload: data });
      dispatch({ type: 'NEXT', payload: '' });

      setDisabled(false);
    } else {
      setDisabled(true);
      dispatch({ type: 'PREV', payload: '' });
    }
  };

  useEffect(() => {
    setValue('tsoName', state.tsoName);
    setValue('tsoLogo', state.tsoLogo);
    setValue('tsoAbbreviation', state?.tsoAbbreviation);
    setValue(
      'tsoStammdateiFile',
      state?.tsoStammdatei ? state?.tsoStammdatei : ''
    );

    return () => {};
  }, [
    setValue,
    state?.tsoAbbreviation,
    state.tsoLogo,
    state.tsoName,
    state?.tsoStammdatei,
  ]);

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmitFirstForm)}>
      <div className="mt-4">
        <InputField
          type="text"
          title="TSO Name"
          id="tsoName"
          name="tsoName"
          placeholder="Full TSO name"
          props={{ ...register('tsoName', { required: true }) }}
        />
      </div>
      <div className="mt-4">
        <InputField
          type="text"
          title="TSO Abbreviation Name"
          id="tsoAbbreviation"
          name="tsoAbbreviation"
          placeholder="Abbreviation of TSO name"
          props={{ ...register('tsoAbbreviation', { required: true }) }}
        />
      </div>
      <div className="mt-4">
        <FileUploadField
          title="TSO Logo"
          name="tsoLogo"
          id="logo"
          fileTypeDescription=".jpg,.png"
          props={{ ...register('tsoLogo', { required: true }) }}
        />
      </div>

      <div className="mt-4">
        <FileUploadField
          title="TSO Stammdatei xlsx/csv file"
          name="tsoStammdateiFile"
          id="tsoStammdateiFile"
          fileTypeDescription=".xlsx,.csv"
          props={{ ...register('tsoStammdateiFile', { required: true }) }}
        />
      </div>
      {state.step === 1 ? (
        <div className="mt-8">
          <Button type="submit">Next</Button>
        </div>
      ) : (
        ''
      )}
    </form>
  );
};

export default SuperAdminFirstForm;
