'use client';
import Image from 'next/image';
import TddLogo from '../../public/icons/TDD-logo-form.svg';
import { Button } from '../../components/Button';
import InputField from '../../components/forms/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { sendEmail } from './actions/send-email';
import { notifySuccess } from '@/components/notifications/SuccessNotification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from '@/components/notifications/ErrorNotification';

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

interface IFormInput {
  email: string;
}

const ResetPassword = () => {
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  // Submitting form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await sendEmail(data.email);
    try {
      if (res.status == 200) {
        notifySuccess('your email has been sent successfully');
        setValue('email', '');
      } else {
        notifyError('The email does not exist');
      }
    } catch (error) {
      notifyError('Please check your network connection');
    }
  };
  return (
    <>
      <nav className="w-fit mx-auto py-4">
        <div className=" bg-secondaryBG rounded p-2">
          <Image src={TddLogo} alt="tdd-icon" width={40} height={40} />
        </div>
      </nav>
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:container  sm:mx-auto px-4 grid place-items-center h-[80vh] py-4"
      >
        <div className="flex bg-white rounded-md shadow-lg p-8 flex-col space-y-3 justify-center items-center relative max-w-md w-full">
          <div className="text-3xl text-center  font-bold ">
            Forgot password
          </div>
          <div className="text-md text-center py-2 ">
            Please enter your email address. you will receive a link to create a
            new password via email
          </div>
          <div className="w-full pb-2">
            <InputField
              icon={emailIcon}
              title=""
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email here"
              props={{ ...register('email', { required: true }) }}
            />
          </div>
          <div className="py-2 w-full">
            <Button>Send</Button>
          </div>
          <Link className="text-greenpale" href="/">
            Back to login
          </Link>
        </div>
      </form>
      <footer>
        <h3 className=" font-neueLeiden text-black text-sm text-center ">
          Copywirght ©2023
        </h3>
      </footer>
    </>
  );
};

export default ResetPassword;
