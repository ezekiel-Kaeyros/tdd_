"use client";

import React from 'react';

import dynamic from 'next/dynamic';
import {
  redirect,
  usePathname,
} from 'next/navigation';

import { useAuth } from '@/app/hooks/useAuth';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

import settingIcon from '../../../../public/icons/settings_suggest.svg';
import userIcon from '../../../../public/icons/users.svg';
import { getTSOById } from '../../actions/get-tsoById';
import { SuperAdminContext } from '../../context/admin.context';

const SuperAdminCardSettings = dynamic(() => import('../../components/SuperAdminCardSettings'), { ssr: false }); 

const TSOPageComponent = ({ data }: any) => { 

    const pathname = usePathname();
    const { user } = useAuth();
    // eslint-disable-next-line no-unused-vars
    const [ getCurrentTSO, setCurrentTSO, clearCurrentTSO ] = useLocalStorage('currentTso'); 
    const [ currentTSOLocal, setCurrentTSOLocal ] = React.useState (data)

    const { state, dispatch } = React.useContext(SuperAdminContext);

    React.useEffect(() => {
        if (user?.role !== 0 && !user.token) {
            redirect('/');
        }

        if (state?.selectedIdTSO) {
            const fetchCurrentTSO = async (id: number) => {
                const res = await getTSOById(id);

                setCurrentTSO(res?.company); 

                setCurrentTSOLocal (res?.company)

                return dispatch({ type: 'GET_CURRENT_TSO', payload: res?.company });
            };

            fetchCurrentTSO(state?.selectedIdTSO); 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.selectedIdTSO]);

    React.useEffect (() => {
        setCurrentTSOLocal (getCurrentTSO())
    }, [])
    // let currentTso = getCurrentTSO();
    return (
        <div>
            <div className="container lg:max-w-5xl mx-auto px-4 mt-32 space-y-40">
                {/* Company logo placeholder */}
                <div className="flex justify-center items-center">
                <div className="font-bold text-4xl">{currentTSOLocal?.company}</div>
                </div>

                {/* Company logo placeholder */}

                <div className="grid grid-cols-1 md:grid-cols-2 justify-center place-items-center gap-5 ">
                <SuperAdminCardSettings
                    icon={userIcon}
                    title="Users"
                    description="The user menu lets you manage of all the simple users, their privileges don't allow them to modify anything in the settings"
                    link={`${pathname}/users`}
                />
                <SuperAdminCardSettings
                    icon={settingIcon}
                    title="Settings"
                    description="The security dashboard lets you view the health of your security settings"
                    link={`${pathname}/settings/profile`}
                />
                </div>
            </div>
        </div>
    )
}

export default TSOPageComponent