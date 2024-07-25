'use client';
import { Button } from '@/components/Button';
import FileUploadField from '@/components/forms/FileUploadField';
import InputField from '@/components/forms/InputField';
import { BACKEND_URL } from '@/types/backendUrl';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import EditProfile from '../../../../public/icons/company/editProfile.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { updateLogoTSO } from '../../actions/update-logoTso';
import { toast } from 'react-toastify';
import { updateConfigFileTso } from '../../actions/update-tso';

const EditSettingsForm = () => {
  interface IFormInput {
    tsoName?: string;
    tsoAbbreviation?: string;
    stammdatei_file?: any;
    image?: File;
  }
  // Initializing React-hook-form
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File>();
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [getCurrentTSO, setCurrentTSO, clearCurrentTSO] =
    useLocalStorage('currentTso');
  const currentTSO = getCurrentTSO();
  // When submitting
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (files) {
      const res = await updateLogoTSO(currentTSO.id, { file: files });
      console.log(res);

      if (res.status === 200) {
        toast.success('update of logo successfull !!!');
      } else {
        toast.error('update of logo failed !!!');
      }
    }
    if (data) {
      const response = await updateConfigFileTso(currentTSO.id, data);
      if (response && response.status === 200) {
        toast.success('update of logo successfull !!!');
        setCurrentTSO(response.data);
      } else {
        toast.error('update of TSO failed !!!');
      }
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFiles(event.target.files?.[0]);
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
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
        {image && typeof image === 'string' ? (
          <Image
            src={image}
            alt="Logo"
            width={100}
            height={70}
            className=" object-cover w-full h-full rounded-full"
          />
        ) : (
          <Image
            src={`${BACKEND_URL}/${currentTSO?.logo_path}`}
            alt="Logo"
            width={100}
            height={70}
            className=" object-cover w-full h-full rounded-full"
          />
        )}
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          hidden
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
        <span>
          <Image
            className="absolute cursor-pointer w-8 right-0 bottom-0"
            src={EditProfile}
            onClick={handleButtonClick}
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
          title="TSO Abbreviation "
          placeholder="TSO Abbreviation"
          type="text"
          props={{
            ...register('tsoAbbreviation', { required: true }),
          }}
        />
      </div>
      <div className="my-2">
        <InputField
          title="Stammdatei"
          id="stammdatei_file"
          type="file"
          name="stammdatei_file"
          placeholder=""
          props={{
            ...register('stammdatei_file'),
            require: false,
          }}
        />
      </div>
      <div className="mt-8">
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
};

export default EditSettingsForm;
