'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { getToken } from '@/app/utils/getToken';
import { BACKEND_URL } from '@/types/backendUrl';

import adminicon from '../../../public/icons/grommet-icons_user-admin.svg';
import usericon from '../../../public/icons/mdi_users.svg';
import menuBtn from '../../../public/icons/menu-btn.svg';
// import DisplaySuperAdminForm from '../components/forms/DisplaySuperAdminForm';
// import HeaderButtonGroup from '../components/HeaderButtonGroup';
// import TsoCards from '../components/TsoCards';
import { SuperAdminContext } from '../context/admin.context';

const DisplaySuperAdminForm = dynamic(() => import('../components/forms/DisplaySuperAdminForm'), { ssr: false });
const HeaderButtonGroup = dynamic(() => import('../components/HeaderButtonGroup'), { ssr: false });
const TsoCards = dynamic(() => import('../components/TsoCards'), { ssr: false });

type Tso = Object[];

const PageComponent = ({ initialData }: any) => {

    console.log('PAGE START');

    const { dispatch } = React.useContext(SuperAdminContext); 

    const [data, setData] = React.useState(initialData);

    // const { data }: { data: [] } = useSWR(
    //     `${BACKEND_URL}/companies/`,
    //     async () => {
    //         const res = await axios.get(`${BACKEND_URL}/companies/`, {
    //             headers: {
    //                 Authorization: `bearer ${getToken()}`,
    //             },
    //         });
    //         return res?.data?.tso_list;
    //     },
    //     {
    //         // refreshInterval: 1000,
    //         // revalidateIfStale: false,
    //         // revalidateOnFocus: false,
    //         // revalidateOnReconnect: false
    //     }
    // );

    React.useEffect (() => {
        if (data && data?.length > 0) {
            console.log("")
        } else {
            fetch(`${BACKEND_URL}/companies/`, {
                headers: {
                    Authorization: `bearer ${getToken()}`,
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setData(data?.tso_list)
            });
        }
    }, [ data ])


    return (
        <>
            <DisplaySuperAdminForm />

            <HeaderButtonGroup />
            <div className="w-fit mx-auto relative px-4 h-fit py-4 mt-32 place-items-center grid ">
                <React.Suspense fallback={ "Loading TSOs List..." }>
                    <div className="elements grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 place-items-center  mx-auto gap-5 center w-fit">
                    {data && data?.length === 0 ? (
                        <>Loading TSOs List...</>
                    ) : (
                        data?.map((tso: any) => {
                        // console.log(tso);

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
                </React.Suspense>
            </div>
        </>
    );
};

export default PageComponent;
