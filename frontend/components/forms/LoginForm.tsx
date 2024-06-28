'use client';
import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import ThreeDotsLoadingAnimation
  from '@/app/convert/components/ThreeDotsLoadingAnimation';
import { login } from '@/context/actions/auth-actions';
import { AuthContext } from '@/context/AuthContext';

import TDDLogo from '../../public/icons/TDD-logo-form.svg';
import { Button } from '../Button';
import ErrorMessage from '../notifications/ErrorMessage';
import { notifyError } from '../notifications/ErrorNotification';
import InputField from './InputField';

const LoginForm = ({ modalVal }: { modalVal: boolean}) => {
  // Handling login form

  interface IFormInput {
    email: string;
    password: string;
  }

  const { push, refresh } = useRouter();
  const [error, setError] = React.useState(modalVal);
  const [loading, setLoading] = React.useState(modalVal);

  const { dispatch } = React.useContext(AuthContext);

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    push('/convert');
    try {
      setLoading(true);
      const res = await login(data);

      if (!res?.token) {
        setLoading(false);
        setError(true);
        ErrorMessage();
      } else {
        setLoading(false);
        setError(false);
        dispatch({ type: 'LOGIN', payload: res });
        toast.success(' login successfull !!!');
        push('/convert');
        refresh();
      }
    } catch (error) {
      notifyError(`Network error please try again, ${error}`);
      toast.error('Network error please try again!!!');
    }
  };

  const emailIcon = (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 1.25L1.25 0.5H20.75L21.5 1.25V14.75L20.75 15.5H1.25L0.5 14.75V1.25ZM2 2.8025V14H20V2.804L11.465 9.35H10.55L2 2.8025ZM18.545 2H3.455L11 7.8035L18.545 2Z"
        fill="#B2BEB5"
      />
    </svg>
  );

  const passwordIcon = (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 10C16 8.897 15.103 8 14 8H13V5C13 2.243 10.757 0 8 0C5.243 0 3 2.243 3 5V8H2C0.897 8 0 8.897 0 10V18C0 19.103 0.897 20 2 20H14C15.103 20 16 19.103 16 18V10ZM5 5C5 3.346 6.346 2 8 2C9.654 2 11 3.346 11 5V8H5V5Z"
        fill="#B2BEB5"
      />
    </svg>
  );

  return (
    <div className="max-w-lg">
      <div className="max-w-lg">{error ? <ErrorMessage /> : ''}</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  flex flex-col items-center py-8 px-8 md:px-8 rounded-lg"
      >
        <div className="p-2 w-10 h-10 bg-gray-800 rounded">
          <Image src={TDDLogo} alt="Logo" />
        </div>
        <div className="font-bold text-xl my-4">Login</div>
        <div className="w-full ">
          <InputField
            name="email"
            type="email"
            id="email"
            placeholder="Email address"
            icon={emailIcon}
            title="Email"
            props={{ ...register('email', { required: true }) }}
          />
        </div>
        <div className="w-full my-4">
          <InputField
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            icon={passwordIcon}
            title="Password"
            props={{
              ...register('password', { required: true, maxLength: 20 }),
            }}
          />
        </div>
        <div className="flex justify-between mb-8 w-full">
          <div className="flex items-center">
            <input
              id="checkbox"
              type="checkbox"
              value=""
              name=""
              className="w-4 h-4 cursor-pointer text-teal-600 accent-emerald-800 border-gray-300 focus:outline-none rounded focus:ring-emerald-700 focus:ring-1"
            />
            <label
              htmlFor="checkbox"
              className="ml-2 cursor-pointer mb-0 text-sm font-medium text-gray-700"
            >
              Remember me
            </label>
          </div>

          <a
            className="text-sm text-greenpale hover:underline-offset-1"
            href="/resetpassword"
          >
            Forgot password?
          </a>
        </div>
        <Button disabled={loading ? true : false} variant="default">
          {loading ? (
            <div className="py-2">
              <ThreeDotsLoadingAnimation />
            </div>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
