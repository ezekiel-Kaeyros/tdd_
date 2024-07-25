'use client';
import React, { Suspense } from 'react';

import TSOPageComponent from './TSOPageComponent';

// const SuperAdminCardSettings = dynamic(() => import('../../components/SuperAdminCardSettings'), { ssr: false }); 
// import SuperAdminCardSettings from '../../components/SuperAdminCardSettings';
// const UpdateUserForm = dynamic(() => import('./forms/UpdateUserForm'), { ssr: false }); 
// const ConfirmActivation = dynamic(() => import('./ConfirmActivation'), { ssr: false }); 

const Page = () => {
  // const pathname = usePathname();
  // const { user } = useAuth();
  // // eslint-disable-next-line no-unused-vars
  // const [getCurrentTSO, setCurrentTSO, clearCurrentTSO] =
  //   useLocalStorage('currentTso');

  // const { state, dispatch } = React.useContext(SuperAdminContext);

  // React.useEffect(() => {
  //   if (user?.role !== 0 && !user.token) {
  //     redirect('/');
  //   }

  //   if (state?.selectedIdTSO) {
  //     const fetchCurrentTSO = async (id: number) => {
  //       const res = await getTSOById(id);

  //       // console.log(res, "..//..//..")

  //       setCurrentTSO(res?.company);

  //       return dispatch({ type: 'GET_CURRENT_TSO', payload: res?.company });
  //     };

  //     fetchCurrentTSO(state?.selectedIdTSO);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state?.selectedIdTSO]);
  // let currentTso = getCurrentTSO();
  return (
    <>
      {/* <div className="container lg:max-w-5xl mx-auto px-4 mt-32 space-y-40">
        <div className="flex justify-center items-center">
          <div className="font-bold text-4xl">{currentTso?.company}</div>
        </div>

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
      </div> */}
      {/* hi */}
      <Suspense fallback="Loading...">
        <TSOPageComponent data={ "" } />
      </Suspense>
    </>
  );
};

export default Page;
