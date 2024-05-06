'use client';
import settingIcon from '../../../public/icons/settings_suggest.svg';
import userIcon from '../../../public/icons/users.svg';
import SuperAdminCardSettings from '../components/SuperAdminCardSettings';
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { SuperAdminContext } from '../context/admin.context';
import { getTSOById } from '../actions/get-tsoById';
import { useAuth } from '@/app/hooks/useAuth';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

const Page = () => {
  const pathname = usePathname();
  const { dispatch } = useContext(SuperAdminContext);
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [getCurrentTSO, setCurrentTSO, clearCurrentTSO] =
    useLocalStorage('currentTso');

  const currentTso = getCurrentTSO();

  useEffect(() => {
    if (user.company) {
      const fetchCurrentTSO = async (id: number) => {
        const res = await getTSOById(id);
        setCurrentTSO(res?.company);
        return dispatch({ type: 'GET_CURRENT_TSO', payload: res?.company });
      };

      fetchCurrentTSO(parseInt(`${user?.company_id}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.company, user?.company_id]);

  return (
    <>
      <main className="container lg:max-w-3xl mx-auto px-4 mt-16 space-y-40">
        {/* Company logo placeholder */}
        <div className="flex justify-center items-center">
          <div className="font-bold text-4xl">{currentTso?.company}</div>
        </div>

        {/* Company logo placeholder */}

        <div className="grid grid-cols-1 md:grid-cols-2 justify-center place-items-center gap-5 ">
          <SuperAdminCardSettings
            icon={userIcon}
            title="Users"
            description="The security dashboard lets you view the health of your security settings"
            link={`${pathname}/users`}
          />

          <SuperAdminCardSettings
            icon={settingIcon}
            title="Settings"
            description="The security dashboard lets you view the health of your security settings"
            link={`${pathname}/settings/profile`}
          />
        </div>
      </main>
    </>
  );
};

export default Page;
