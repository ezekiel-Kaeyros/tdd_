'use client';

import { useContext, useEffect, useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { gettingAbbr } from '@/app/utils/utils';
import UserTable from '@/app/(administrators)/components/UserTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SuperAdminContext } from '@/app/(administrators)/context/admin.context';
import { getUsers } from '@/app/(administrators)/actions/get-users';
import { useAuth } from '@/app/hooks/useAuth';

const Admin = () => {
  const [users, setUsers] = useState<any>([]);
  const { state } = useContext(SuperAdminContext);
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

  const filterRole = (user: any) => {
    return user?.role === 1 && user.is_actif === true;
  };

  let actualUsers = users?.filter(
    (user: any) => gettingAbbr(user?.company) === paths[2]
  );

  let adminUsers = actualUsers?.filter(filterRole);

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
      <main className="max-w-7xl mx-auto px-8">
        <h1 className=" font-semibold text-6xl w-fit text-secondaryBG ">
          Admin
          <br />
          Users
        </h1>
        <UserTable data={adminUsers} />
      </main>
    </div>
  );
};

export default Admin;
