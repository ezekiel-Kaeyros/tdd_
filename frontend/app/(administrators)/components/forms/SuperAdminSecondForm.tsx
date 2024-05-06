import { Button } from '@/components/Button';
import InputField from '@/components/forms/InputField';
import SelectField from '@/components/forms/SelectField';
import React, { useContext } from 'react';
import { SuperAdminContext } from '../../context/admin.context';
import { SubmitHandler, useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { notifySuccess } from '@/components/notifications/SuccessNotification';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { createTSO } from '../../actions/create-tso';

export const SuperAdminSecondForm = () => {
  const { state, dispatch } = useContext(SuperAdminContext);

  interface IFormInput {
    tsoAdminName: string;
    tsoAdminEmail: string;
    tsoAdminPassword: string;
    confirmPassword: string;
    tsoAdminRole: number;
  }

  // When user clic on next button

  const { register, handleSubmit, watch } = useForm<IFormInput>();

  const onSubmitFullForm: SubmitHandler<IFormInput> = async (data: any) => {
    if (
      state?.tsoLogo &&
      state?.tsoName &&
      state?.tsoStammdatei &&
      state?.tsoAbbreviation &&
      data.tsoAdminName &&
      data.tsoAdminPassword &&
      data.tsoAdminEmail
      //data.tsoAdminRole
    ) {
      dispatch({ type: 'SUBMIT', payload: data });

      // Formatting in backends format
      const email = data?.tsoAdminEmail;
      //const role = state.tsoAdminRole;
      const file = state?.tsoLogo[0];
      //const config_file = state.tsoConfigFile[0];
      const stammdatei_file = state.tsoStammdatei[0];
      const password = data.tsoAdminPassword;
      const username = data.tsoAdminName;
      const company = state.tsoName;
      const abbreviation = state.tsoAbbreviation;

      let formData = new FormData();

      formData.append('file', file);
      formData.append('stammdatei_file', stammdatei_file);
      //formData.append('config_file', config_file);
      formData.append('email', email);
      formData.append('role', '1');
      formData.append('password', password);
      formData.append('username', username);
      formData.append('company', company);
      formData.append('tsoAbbreviation', abbreviation);

      try {
        const result = await createTSO(formData);

        if (result.status === 200) {
          notifySuccess('TSO created successfully');
          dispatch({ type: 'SUPER_ADMIN_MODAL', payload: false });
          dispatch({ type: 'CLEAR_FORM', payload: '' });
          dispatch({ type: 'PREV', payload: '' });
          dispatch({ type: 'REFRESH', payload: '' });
        } else {
          // Something went wrong
          notifyError('Something went wrong, try again');
        }
      } catch (error) {
        notifyError(`${error}`);
      }
    }
  };

  // Checking if password matches
  let password = watch('tsoAdminPassword')?.toString();
  let confirmPassword = watch('confirmPassword')?.toString();

  // Checking password strength
  let passwordRegex = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
  );

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmitFullForm)}>
      <div className="mt-4">
        <InputField
          type="text"
          title="TSO Admin Name"
          id="tsoAdminName"
          name="tsoAdminName"
          placeholder="TSO Admin name"
          props={{ ...register('tsoAdminName', { required: true }) }}
        />
      </div>
      <div className="mt-4">
        <InputField
          type="email"
          title="TSO Email"
          id="tsoAdminEmail"
          name="tsoAdminEmail"
          placeholder="Email"
          props={{ ...register('tsoAdminEmail', { required: true }) }}
        />
      </div>
      <div className="mt-4">
        <InputField
          type="password"
          title="TSO Admin Password"
          id="tsoAdminPassword"
          name="tsoAdminPassword"
          placeholder="Password"
          props={{ ...register('tsoAdminPassword', { required: true }) }}
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

      <div className="mt-4">
        <InputField
          type="password"
          title="Confirm password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          props={{ ...register('confirmPassword', { required: true }) }}
        />
      </div>
      <span className="text-xs text-red-600">
        {password !== confirmPassword && confirmPassword?.length !== 0
          ? 'Password must match'
          : ''}
      </span>

      <div className="mt-4">
        <SelectField
          name="tsoAdminRole"
          props={{ ...register('tsoAdminRole') }}
        />
      </div>
      <div className="flex mt-8 w-full justify-between">
        <div className="w-full mr-8">
          <Button
            onClick={() => dispatch({ type: 'PREV', payload: '' })}
            variant="outline"
          >
            Back
          </Button>
        </div>
        <div className="w-full ml-8">
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  );
};

export default SuperAdminSecondForm;
