'use client';
import { Button } from '@/components/Button';
import FileUploadField from '@/components/forms/FileUploadField';
import InputField from '@/components/forms/InputField';
import { BACKEND_URL } from '@/types/backendUrl';
import Image from 'next/image';
import React, { useEffect } from 'react';
import EditProfile from '../../../../public/icons/company/editProfile.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

const EditSettingsForm = () => {
  interface IFormInput {
    tsoName: string;
    tsoAbbreviation: string;
    stammdatei_file: any;
  }

  // Initializing React-hook-form
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const [getCurrentTSO] = useLocalStorage('currentTso');

  const currentTSO = getCurrentTSO();
  // When submitting

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    setValue('tsoName', `${currentTSO?.company}`);
    setValue('tsoAbbreviation', `${currentTSO?.tsoAbbreviation}`);
    setValue('stammdatei_file', `${currentTSO?.stammdatei_file_path}`);
  }, [
    currentTSO?.company,
    currentTSO?.tsoAbbreviation,
    currentTSO?.stammdatei_file_path,
    setValue,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8 relative bg-slate-100 flex justify-center items-center w-32 h-32 rounded-full">
        <Image
          src={`${BACKEND_URL}/${currentTSO?.logo_path}`}
          alt="Logo"
          width={100}
          height={70}
        />
        <span>
          <Image
            className="absolute cursor-pointer w-8 right-0 bottom-0"
            src={EditProfile}
            alt="Edit profile"
          />
        </span>
      </div>
      <div className="my-2">
        <InputField
          name="tsoName"
          id="tsoName"
          title="TSO Name"
          placeholder="TSO name"
          type="text"
          props={{
            ...register('tsoName', { required: true }),
          }}
        />
      </div>
      <div className="my-2">
        <InputField
          name="tsoAbbreviation"
          id="tsoAbbreviation"
          title="TSO Name"
          placeholder="TSO Abbreviation"
          type="text"
          props={{
            ...register('tsoAbbreviation', { required: true }),
          }}
        />
      </div>
      <div className="my-2">
        <FileUploadField
          title="Stammdatei"
          id="stammdatei_file"
          fileTypeDescription=".csv"
          name="stammdatei_file"
          props={{
            ...register('stammdatei_file', { required: true }),
          }}
        />
      </div>
      {/* <div className="my-2">
        <SelectField title="Users Limit" name="usersLimit" props={''} />
      </div>
      <div className="my-2">
        <SelectField title="Admin Limit" name="adminLimit" props={''} />
      </div>

      <div className="my-2">
        <SelectField title="Password policy" name="passwordPolicy" props={''} />
      </div> */}
      <div className="mt-8">
        <Button>Update</Button>
      </div>
    </form>
  );
};

export default EditSettingsForm;
