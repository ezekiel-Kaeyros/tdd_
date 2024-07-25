'use client';
import { Button } from '@/components/Button';
import InputField from '@/components/forms/InputField';
import SelectField from '@/components/forms/SelectField';
import { notifySuccess } from '@/components/notifications/SuccessNotification';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SuperAdminContext } from '../../context/admin.context';
// import { encryptData } from '@/app/utils/encryptData';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { createUser } from '../../actions/create-user';

const CreateUserForm: React.FC = () => {
  interface IFormInput {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: number;
    company: string;
  }

  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const { dispatch } = useContext(SuperAdminContext);

  // When submitting form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let username = data?.username;
    let password = data?.password;
    let email = data?.email;
    let role = data?.role;

    let company = data?.company;
    let bodyContent = {
      username,
      password,
      email,
      role,
      company,
    };

    // let dataToBeSend = {
    //   token: encryptData(bodyContent),
    // };
    try {
      const result = await createUser(bodyContent);

      if (result.status === 200) {
        dispatch({ type: 'SUPER_ADMIN_MODAL_CREATE_USER', payload: false });
        dispatch({ type: 'SUPER_ADMIN_MODAL_DELETE_USER', payload: false });
        dispatch({ type: 'REFRESH', payload: '' });
        notifySuccess('Created successfully');
      } else {
        // Something went wrong
        notifyError('user with this email exist');
      }
    } catch (error) {
      notifyError('Something went wrong, try again');
    }
  };

  // Checking if password matches
  let password = watch('password')?.toString();
  let confirmPassword = watch('confirmPassword')?.toString();

  // Checking password strength
  let passwordRegex = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-2">
        <InputField
          name="username"
          title="Username"
          placeholder="Username"
          id="username"
          type="text"
          props={{
            ...register('username', { required: true }),
          }}
        />
      </div>
      <div className="my-2">
        <InputField
          name="email"
          title="Email"
          placeholder="abc@email.com"
          id="email"
          type="email"
          props={{
            ...register('email', { required: true }),
          }}
        />
      </div>
      <div className="my-2">
        <InputField
          name="password"
          title="Password"
          placeholder="Password"
          id="password"
          type="password"
          props={{
            ...register('password', { required: true }),
          }}
        />
      </div>
      {!passwordRegex.test(password) && password?.length !== 0 ? (
        <span className="text-xs text-red-600">
          <ul className="list-disc  pl-4">
            <li>Must be 8 characters minimum</li>
            <li>Must include a capital letter</li>
            <li>Must have a special character</li>
            <li>Must include a number</li>
          </ul>
        </span>
      ) : (
        ''
      )}
      <div className="my-2">
        <InputField
          name="confirmPassword"
          title="Confirm password"
          placeholder="Confirm password"
          id="confirmPassword"
          type="password"
          props={{
            ...register('confirmPassword', { required: true }),
          }}
        />
      </div>
      <span className="text-xs text-red-600">
        {password !== confirmPassword && confirmPassword?.length !== 0
          ? 'Password must match'
          : ''}
      </span>
      <div className="my-3">
        <SelectField
          props={{
            ...register('role', { required: true }),
          }}
          name="role"
        />
      </div>

      <div className="my-2">
        <SelectField
          company={true}
          props={{
            ...register('company', { required: true }),
          }}
          name="company"
        />
      </div>

      <div className="mt-8">
        <Button>Create</Button>
      </div>
    </form>
  );
};
export default CreateUserForm;
