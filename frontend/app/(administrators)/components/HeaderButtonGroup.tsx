import React from 'react';

import dynamic from 'next/dynamic';

// const { Button } = dynamic(() => import('@/components/Button'), { ssr: false });
// import { Button } from '@/components/Button';
import PlusIcon from '../../../public/icons/plusicon.svg';
import { SuperAdminContext } from '../context/admin.context';

// Dynamically import the Button component
const Button = dynamic(() =>
  import('@/components/Button').then((mod) => mod.Button),
  { ssr: false } // Set ssr to false if you don't want the component to be server-side rendered
);

const HeaderButtonGroup: React.FC = () => {
  const { state, dispatch } = React.useContext(SuperAdminContext);
  return (
    <div className="flex z-10 flex-between w-fit ml-auto pr-48 py-8">
      <div>
        <Button
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
  );
};

export default HeaderButtonGroup;
