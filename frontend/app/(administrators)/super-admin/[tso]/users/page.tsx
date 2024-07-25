'use client';

import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import dynamic from 'next/dynamic';
import {
  redirect,
  usePathname,
} from 'next/navigation';
import { ToastContainer } from 'react-toastify';

// import CreateUserForm
//   from '@/app/(administrators)/components/forms/CreateUserForm';
// import FormCard from '@/app/(administrators)/components/forms/FormCard';
// import UserTable from '@/app/(administrators)/components/UserTable';
// import { Button } from '@/components/Button';
// import Modal from '@/components/Modal'; 
import { getUsers } from '@/app/(administrators)/actions/get-users';
import {
  SuperAdminContext,
} from '@/app/(administrators)/context/admin.context';
import { useAuth } from '@/app/hooks/useAuth';

import PlusIcon from '../../../../../public/icons/plusicon.svg';

const FormCard = dynamic(() => import('@/app/(administrators)/components/forms/FormCard'), { ssr: false }); 
const Modal = dynamic(() => import('@/components/Modal'), { ssr: false }); 
const UserTable = dynamic(() => import('@/app/(administrators)/components/UserTable'), { ssr: false }); 
const CreateUserForm = dynamic(() => import('@/app/(administrators)/components/forms/CreateUserForm'), { ssr: false }); 
const Button = dynamic(() =>
  import('@/components/Button').then((mod) => mod.Button),
  { ssr: false } // Set ssr to false if you don't want the component to be server-side rendered
);

const Users = () => {
  const { state, dispatch } = React.useContext(SuperAdminContext);
  const [ users, setUsers ] = React.useState<any>([]);
  const [ selectedIdTSO, setSelectedIdTSO ] = React.useState<any>("");
  const pathname = usePathname();
  const paths = pathname.split('/');


  const { user } = useAuth();

  // console.log(state.currentTSO, "lllll11111")

  React.useEffect(() => {
    setSelectedIdTSO (localStorage.getItem("selectedIdTSO"))
    if (user?.role !== 0 && !user?.token) {
      return redirect('/');
    }

    async function fetchData() {
      // You can await here
      const fetchUsers = async () => {
        const res = await getUsers();

        // console.log(res?.usersList, "llllffffkkkk")

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

  // 
  let actualUsersV2 = users?.filter(
    (user: any) => parseInt(user?.company_id) === parseInt(selectedIdTSO) // state?.selectedIdTSO
  );

  // console.log(actualUsersV2, users, "jjjjjjjjjjjjjjjjj", selectedIdTSO)

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
        <UserTable data={actualUsersV2} />
      </main>
    </div>
  );
};

export default Users;
