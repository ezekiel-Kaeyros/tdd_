'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { ProductSvgIcon } from '@/components/SvgIcons';

import adminicon from '../../../public/icons/grommet-icons_user-admin.svg';
import usericon from '../../../public/icons/mdi_users.svg';
import menuBtn from '../../../public/icons/menu-btn.svg';
import PlusIcon from '../../../public/icons/plusicon.svg';
import { getTsoList } from '../actions/get-tsoList';
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

const PageComponent = ({ initialData }: any) => {

    console.log('PAGE START');

    const { state, dispatch } = React.useContext(SuperAdminContext); 

    const [data, setData] = React.useState<any>([]);

    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const [IsFetching, setIsFetching] = React.useState<boolean>(false);

    React.useEffect (() => {
        async function fetchData() {
            // console.log("came here............")
            setIsFetching (true)
            // You can await here
            const fetchUsers = async () => {
                const res = await getTsoList();
                setData(res);
                setIsLoading (false)
            };
            await fetchUsers();
            setIsFetching (false)
        }

        fetchData();
    }, [ state?.refreshData ])

    // console.log("After useEffect............")

    if (isLoading) {
        return (
            <div className=' h-[90vh] w-full text-white flex justify-center items-center'>
                <div className="w-12 h-12 rounded-full animate-spin border border-solid border-black border-t-transparent"></div>
            </div>
        )
    } if (IsFetching) {
        return (
            <div className=' h-[90vh] w-full text-white flex justify-center items-center'>
                Fetching TSO List
                {/* <div className="w-12 h-12 rounded-full animate-spin border border-solid border-yellow-500 border-t-transparent"></div> */}
            </div>
        )
    } else {
        return (
            <>
                {data && data?.length === 0 ?
                    ""
                    :
                    <HeaderButtonGroup />
                }
                <div className="overflow-y-scroll no-scrollbar w-full h-full mx-auto relative px-4 py-[5rem] pb-10 place-items-center grid ">
                    <React.Suspense fallback={ "Loading TSOs List..." }>
                        {data && data?.length === 0 ? (
                            <div className=' h-[50hv] w-full flex flex-col justify-center items-center '>
                                <ProductSvgIcon height={ 60 } width={ 60 } />
                                <h1 className='text-[30px]'>No TSO Found</h1>
                                <div>
                                    <p className='text-deemGray text-[18px] max-w-sm break-words p-4 text-center'>Get started by adding new TSO info in for your organisation. </p>
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
                        <div className="elements grid grid-cols-1 h-[60vh] sm:grid-cols-2  md:grid-cols-3 place-items-center mt-5 mx-auto gap-5 center w-fit">
                            {
                                data?.map((tso: any) => {

                                    // console.log(tso, tso?.userList, "hhhhhhh")
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
                        }
                    </React.Suspense>
                </div>
            </>
        );
    }

};

export default PageComponent;
