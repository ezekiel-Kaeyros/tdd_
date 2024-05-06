'use client';

import UserTable from '@/app/(administrators)/components/UserTable';
import { useContext, useEffect, useState } from 'react';
import { SuperAdminContext } from '@/app/(administrators)/context/admin.context';
import { Button } from '@/components/Button';
import PlusIcon from '../../../../public/icons/plusicon.svg';
import CreateUserForm from '@/app/(administrators)/components/forms/CreateUserForm';
import Modal from '@/components/Modal';
import FormCard from '@/app/(administrators)/components/forms/FormCard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { getUsers } from '../../actions/get-users';
import { useAuth } from '@/app/hooks/useAuth';

const Users = () => {
  const { state, dispatch } = useContext(SuperAdminContext);
  const [users, setUsers] = useState<any>([]);

  const { user } = useAuth();

  useEffect(() => {
    // You can await here
    const fetchUsers = async () => {
      const res = await getUsers();

      setUsers(res?.usersList);
    };
    fetchUsers();
    // ...
  }, [state?.refreshData]);

  let actualUsers = users?.filter((el: any) => el?.company === user?.company);
  //

  return (
    <div className="mt-24">
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
      {state.SuperAdminModalCreateUser ? (
        <Modal>
          <div>
            <FormCard>
              <CreateUserForm />
            </FormCard>
          </div>
        </Modal>
      ) : (
        ''
      )}
      <div className="w-[135px] ml-auto mr-16">
        <Button
          onClick={() =>
            dispatch({
              type: 'SUPER_ADMIN_MODAL_CREATE_USER',
              payload: !state.SuperAdminModalCreateUser,
            })
          }
          icon={PlusIcon}
        >
          Add user
        </Button>
      </div>
      <main className="max-w-7xl mx-auto px-8 mb-16">
        <h1 className=" font-semibold text-6xl w-fit text-secondaryBG my-8">
          users
          <br />
          Configuration
        </h1>
        <UserTable data={actualUsers} />
      </main>
    </div>
  );
};

export default Users;
