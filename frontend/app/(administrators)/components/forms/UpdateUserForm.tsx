import { Button } from '@/components/Button';
import InputField from '@/components/forms/InputField';
import SelectField from '@/components/forms/SelectField';
import { notifySuccess } from '@/components/notifications/SuccessNotification';
import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SuperAdminContext } from '../../context/admin.context';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { updateUser } from '../../actions/update-user';
import { getUsers } from '../../actions/get-users';

type Props = {
  id: number;
};

type User = [] | any;

const UpdateUserForm: React.FC<Props> = () => {
  const [user, setUser] = useState<User>();
  const { state } = useContext(SuperAdminContext);
  interface IFormInput {
    username: string;
    email: string;
    new_email: string;
    password: string;
    newpassword: string;
    role: number;
  }

  const { register, handleSubmit, setValue, watch } = useForm<IFormInput>();
  const { dispatch } = useContext(SuperAdminContext);
  // When submitting form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let id = state?.idToBeUpdated;
    let username = data?.username;
    let password = data?.password;
    let email = data?.email;
    let new_email = data?.new_email;
    let newpassword = data?.newpassword;

    let role = data?.role;
    let bodyContent = {
      id,
      username,
      password,
      email,
      role,
      new_email,
      newpassword,
    };

    try {
      const result = await updateUser(bodyContent, state?.idToBeUpdated);

      if (result?.status === 200) {
        dispatch({ type: 'SUPER_ADMIN_MODAL_UPDATE_USER', payload: false });
        notifySuccess('Updated successfully');
        dispatch({ type: 'REFRESH', payload: '' });
      } else {
        // Something went wrong
        notifyError('Something went wrong, try again');
      }
    } catch (error) {
      notifyError('Server error, try again');
    }
  };

  // Setting selected users value

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const fetchUsers = async () => {
        const res = await getUsers();

        setUser(
          res?.usersList?.filter((val: any) => val.id === state?.idToBeUpdated)
        );
      };
      fetchUsers();
      // ...
    }

    fetchData();

    return () => {};
  }, [state?.idToBeUpdated, user?.length]);

  if (user?.length !== 0 && user) {
    setValue('username', user[0]?.username);
    setValue('email', user[0]?.email);
    setValue('role', user[0]?.role);
  }

  // Checking if password matches
  let newPassword = watch('newpassword')?.toString();
  let password = watch('password')?.toString();

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
            ...register('username'),
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
            ...register('email'),
          }}
        />
      </div>
      <div className="my-2">
        <InputField
          name="new_email"
          title="New email"
          placeholder="abc@email.com"
          id="new_email"
          type="email"
          props={{
            ...register('new_email'),
          }}
        />
      </div>
      <div className="my-2">
        <InputField
          name="password"
          title="Old Password"
          placeholder="Password"
          id="password"
          type="password"
          props={{
            ...register('password'),
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
          name="newpassword"
          title="New password"
          placeholder="New password"
          id="newpassword"
          type="password"
          props={{
            ...register('newpassword'),
          }}
        />
      </div>
      {!passwordRegex.test(newPassword) && newPassword?.length !== 0 ? (
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
        <SelectField
          props={{
            ...register('role'),
          }}
          name="role"
        />
      </div>

      <div className="mt-8">
        <Button>Update</Button>
      </div>
    </form>
  );
};
export default UpdateUserForm;
