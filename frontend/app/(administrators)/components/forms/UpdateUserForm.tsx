import React from 'react';

import dynamic from 'next/dynamic';
import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { useAuth } from '@/app/hooks/useAuth';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { notifySuccess } from '@/components/notifications/SuccessNotification';

import { getUsers } from '../../actions/get-users';
import { updateUser } from '../../actions/update-user';
import { SuperAdminContext } from '../../context/admin.context';

// import { Button } from '@/components/Button'; 

const Button = dynamic(() =>
  import('@/components/Button').then((mod) => mod.Button),
  { ssr: false } // Set ssr to false if you don't want the component to be server-side rendered
);

const InputField = dynamic(() => import('@/components/forms/InputField'), { ssr: false }); 
const SelectField = dynamic(() => import('@/components/forms/SelectField'), { ssr: false }); 

type Props = {
  id: number;
};

type User = [] | any;

const UpdateUserForm: React.FC<Props> = () => {
  const [user, setUser] = React.useState<User>();
  const { dispatch, state } = React.useContext(SuperAdminContext); 

  const { userData } = useAuth();

  console.log(userData, "this is my data as a logedin person")

  const handleNotification = async (message: string) => {
    const { notifyError } = await import('@/components/notifications/ErrorNotification');
    notifyError(message);
  };
  const handleNotificationSuccess = async (message: string) => {
    const { notifySuccess } = await import('@/components/notifications/SuccessNotification');
    notifySuccess(message);
  };
  interface IFormInput {
    username: string;
    email: string;
    new_email: string;
    password: string;
    newpassword: string;
    role: number;
  }

  const { register, handleSubmit, setValue, watch } = useForm<IFormInput>();
  // const { dispatch } = React.useContext(SuperAdminContext);
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

      console.log(result, "ttttttttttttttttttt")

      if (result?.status === 200) {
        dispatch({ type: 'SUPER_ADMIN_MODAL_UPDATE_USER', payload: false });
        notifySuccess ('Updated successfully')
        // handleNotificationSuccess('Updated successfully');
        dispatch({ type: 'REFRESH', payload: '' });
      } else {
        // Something went wrong
        // handleNotification('Something went wrong, try again');
        notifyError('Something went wrong, try again');
      }
    } catch (error) {
      // handleNotification('Server error, try again');
      notifyError('Server error, try again');;
    }
  };

  // Setting selected users value

  React.useEffect(() => {
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
      {
        userData?.role === 0 || userData?.role === 1 ? 
          ""
          :
          <>
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
          </>

      }
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
