'use client';

import {
  useContext,
  useState,
} from 'react';

import axios from 'axios';
import useSWR from 'swr';

import { getToken } from '@/app/utils/getToken';
import { BACKEND_URL } from '@/types/backendUrl';

import adminicon from '../../../public/icons/grommet-icons_user-admin.svg';
import usericon from '../../../public/icons/mdi_users.svg';
import menuBtn from '../../../public/icons/menu-btn.svg';
import DisplaySuperAdminForm from '../components/forms/DisplaySuperAdminForm';
import HeaderButtonGroup from '../components/HeaderButtonGroup';
import TsoCards from '../components/TsoCards';
import { SuperAdminContext } from '../context/admin.context';

type Tso = Object[];

const Page = () => {
  console.log('PAGE START');
  const [tsoList, setTsoList] = useState<Tso>([]);
  const { dispatch, state } = useContext(SuperAdminContext);

  const { data, error, isLoading }: { data: []; error: any; isLoading: any } =
    useSWR(
      `${BACKEND_URL}/companies/`,
      async () => {
        const res = await axios.get(`${BACKEND_URL}/companies/`, {
          headers: {
            Authorization: `bearer ${getToken()}`,
          },
        });
        return res?.data?.tso_list;
      },
      {
        // refreshInterval: 1000,
        // revalidateIfStale: false,
        // revalidateOnFocus: false,
        // revalidateOnReconnect: false
      }
    );

    console.log("compa", data)

  return (
    <div>
      <DisplaySuperAdminForm />

      <HeaderButtonGroup />
      <main className="w-fit mx-auto relative px-4 h-fit py-4 mt-32 place-items-center grid ">
        <div className="elements grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 place-items-center  mx-auto gap-5 center w-fit">
          {data?.length === 0 ? (
            <>Loading TSOs List...</>
          ) : (
            data?.map((tso: any) => {
              console.log(tso);

              return (
                <div
                  onClick={() =>
                    dispatch({ type: 'SELECT_TSO', payload: tso?.id })
                  }
                  key={tso?.id}
                >
                  <TsoCards
                    tsoId={tso?.id}
                    tsoName={tso?.company}
                    tsoLogo={tso?.logo_path}
                    detailsIcon={menuBtn}
                    userCount={
                      tso?.userList?.filter((el: any) => el?.is_actif === true)
                        ?.length
                    }
                    adminIcon={adminicon}
                    userIcon={usericon}
                    link={`/super-admin/${tso?.tsoAbbreviation}`}
                  />
                </div>
              );
            })
          )}
        </div>
      </main>
      {/* <Suspense>
      </Suspense> */}
    </div>
  );
};

export default Page;
