'use client';

import React from 'react';

import axios from 'axios';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

import { getToken } from '@/app/utils/getToken';
import { ProductSvgIcon } from '@/components/SvgIcons';
import { BACKEND_URL } from '@/types/backendUrl';

import adminicon from '../../../public/icons/grommet-icons_user-admin.svg';
import usericon from '../../../public/icons/mdi_users.svg';
import menuBtn from '../../../public/icons/menu-btn.svg';
import PlusIcon from '../../../public/icons/plusicon.svg';
// import adminicon from '../../../public/icons/grommet-icons_user-admin.svg';
// import usericon from '../../../public/icons/mdi_users.svg';
// import menuBtn from '../../../public/icons/menu-btn.svg';
// import DisplaySuperAdminForm from '../components/forms/DisplaySuperAdminForm';
// import HeaderButtonGroup from '../components/HeaderButtonGroup';
// import TsoCards from '../components/TsoCards';
import { SuperAdminContext } from '../context/admin.context';

const DisplaySuperAdminForm = dynamic(() => import('../components/forms/DisplaySuperAdminForm'), { ssr: false });
const HeaderButtonGroup = dynamic(() => import('../components/HeaderButtonGroup'), { ssr: false });
const TsoCards = dynamic(() => import('../components/TsoCards'), { ssr: false });

// Dynamically import the Button component
const Button = dynamic(() =>
    import('@/components/Button').then((mod) => mod.Button),
    { ssr: false } // Set ssr to false if you don't want the component to be server-side rendered
);

type Tso = Object[];

// const fetcher = (url: any) => fetch(url).then(res => res.json());

const PageComponent = ({ initialData }: any) => {

    console.log('PAGE START');

    const { state, dispatch } = React.useContext(SuperAdminContext); 

    // const [dataD, setDataD] = React.useState(initialData);

    const { data, isValidating, error } = useSWR(
        `${BACKEND_URL}/companies/`,
        async () => {
            const res = await axios.get(`${BACKEND_URL}/companies/`, {
                headers: {
                    Authorization: `bearer ${getToken()}`,
                },
            });
            return res?.data?.tso_list;
        },
        // fetcher, 
        {
            revalidateOnMount: true,
            // refreshInterval: 10000,
            // revalidateIfStale: false,
            // revalidateOnFocus: false,
            // revalidateOnReconnect: false
            fallbackData: initialData
        }
    );

    if (isValidating) {
        return (
            <div className='bg-black h-[90vh] w-full text-white flex justify-center items-center'>
                <div className="w-12 h-12 rounded-full animate-spin border border-solid border-yellow-500 border-t-transparent"></div>
            </div>
        )
    }
    
    if (error) {
        return (
            <div className='bg-black h-[90vh] w-full text-white flex justify-center items-center'>
                <h1>An Error occured</h1>
            </div>
        )
    }

    if (Array.isArray(data) && data.length === 0) {
        return (
            <>
                <HeaderButtonGroup />
                <div className=' h-[70vh] w-full flex flex-col justify-center items-center '>
                    <ProductSvgIcon height={ 60 } width={ 60 } />
                    <h1 className='text-[30px]'>No Items Found</h1>
                    <div>
                        <p className='text-deemGray text-[18px] max-w-sm break-words p-4 text-center'>Get started by adding new items in your organisation to keep track of their usage.</p>
                    </div>

                    <div className='flex justify-center items-center'>
                        <Button
                            className='w-[200px]'
                            onClick={() =>
                                dispatch({
                                type: 'SUPER_ADMIN_MODAL',
                                payload: !state.SuperAdminModal,
                                })
                            }
                            icon={PlusIcon}
                        >
                            Add TSO
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    // React.useEffect (() => {
    //     if (data && data?.length > 0) {
    //         console.log("")
    //     } else {
    //         fetch(`${BACKEND_URL}/companies/`, {
    //             headers: {
    //                 Authorization: `bearer ${getToken()}`,
    //             },
    //         })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setData(data?.tso_list)
    //         });
    //     }
    // }, [ data ])


    return (
        <>
            {/* <DisplaySuperAdminForm /> */}

            <HeaderButtonGroup />
            <div className="w-fit mx-auto relative px-4 h-fit py-4 mt-32 place-items-center grid ">
                <React.Suspense fallback={ "Loading TSOs List..." }>
                    <div className="elements grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 place-items-center  mx-auto gap-5 center w-fit">
                        {
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
                        }
                    </div>
                    
                    {/* {data && data?.length === 0 ? (
                        <div className=' h-[50hv] w-full flex flex-col justify-center items-center '>
                            <ProductSvgIcon height={ 60 } width={ 60 } />
                            <h1 className='text-[30px]'>No Items Found</h1>
                            <div>
                                <p className='text-deemGray text-[18px] max-w-sm break-words p-4 text-center'>Get started by adding new items in your organisation to keep track of their usage.</p>
                            </div>

                            <div className='flex justify-center items-center'>
                                <Button
                                    className='w-[200px]'
                                    onClick={() =>
                                        dispatch({
                                        type: 'SUPER_ADMIN_MODAL',
                                        payload: !state.SuperAdminModal,
                                        })
                                    }
                                    icon={PlusIcon}
                                >
                                    Add TSO
                                </Button>
                            </div>
                        </div>
                    ) : 
                    <div className="elements grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 place-items-center  mx-auto gap-5 center w-fit">
                        {
                            data?.map((tso: any) => {
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
                        }
                    </div>
                    } */}
                </React.Suspense>
            </div>
        </>
    );
};

export default PageComponent;
