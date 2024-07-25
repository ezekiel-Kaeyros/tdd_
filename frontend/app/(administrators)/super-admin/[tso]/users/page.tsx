'use client';

import UserTable from '@/app/(administrators)/components/UserTable';
import { useContext, useEffect, useState } from 'react';
import { SuperAdminContext } from '@/app/(administrators)/context/admin.context';
import { redirect, usePathname } from 'next/navigation';
import { Button } from '@/components/Button';
import PlusIcon from '../../../../../public/icons/plusicon.svg';
import CreateUserForm from '@/app/(administrators)/components/forms/CreateUserForm';
import Modal from '@/components/Modal';
import FormCard from '@/app/(administrators)/components/forms/FormCard';
import { gettingAbbr } from '@/app/utils/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsers } from '@/app/(administrators)/actions/get-users';
import { useAuth } from '@/app/hooks/useAuth';

const Users = () => {
  const { state, dispatch } = useContext(SuperAdminContext);
  const [users, setUsers] = useState<any>([]);
  const pathname = usePathname();
  const paths = pathname.split('/');

  const { user } = useAuth();

  useEffect(() => {
    if (user?.role !== 0 && !user?.token) {
      return redirect('/');
    }

    async function fetchData() {
      // You can await here
      const fetchUsers = async () => {
        const res = await getUsers();

        setUsers(res?.usersList);
      };
      fetchUsers();
      // ...
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.refreshData]);

  let actualUsers = users?.filter(
    (user: any) => user?.tsoAbbreviation === paths[2]
  );

  return (
    <div className="mt-16">
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
