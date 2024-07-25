import { Button } from '@/components/Button';
import React, { useContext } from 'react';
import PlusIcon from '../../../public/icons/plusicon.svg';
import { SuperAdminContext } from '../context/admin.context';

const HeaderButtonGroup: React.FC = () => {
  const { state, dispatch } = useContext(SuperAdminContext);
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
