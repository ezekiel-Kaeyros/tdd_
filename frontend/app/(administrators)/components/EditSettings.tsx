'use client';
import {
  useContext,
  useState,
} from 'react';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FaRegCheckCircle } from 'react-icons/fa';

import { useAuth } from '@/app/hooks/useAuth';
import { useClickOutside } from '@/app/hooks/useClickOutside';

// import Modal from '@/components/Modal';
import deleteIcon from '../../../public/icons/delete.svg';
import editIcon from '../../../public/icons/edit.svg';
import menuBtn from '../../../public/icons/menu-btn.svg';
import { SuperAdminContext } from '../context/admin.context';

// import ConfirmActivation from './ConfirmActivation';
// import ConfirmDelete from './ConfirmDelete';
// import FormCard from './forms/FormCard';
// import UpdateUserForm from './forms/UpdateUserForm'; 

const FormCard = dynamic(() => import('./forms/FormCard'), { ssr: false }); 
const Modal = dynamic(() => import('@/components/Modal'), { ssr: false }); 
const ConfirmDelete = dynamic(() => import('./ConfirmDelete'), { ssr: false }); 
const UpdateUserForm = dynamic(() => import('./forms/UpdateUserForm'), { ssr: false }); 
const ConfirmActivation = dynamic(() => import('./ConfirmActivation'), { ssr: false }); 

type Props = {
  id: number;
  role: number;
  isActive?: boolean;
};

const EditSettings: React.FC<Props> = ({ id, role, isActive }) => {
  const [open, setOpen] = useState(false);
  const [openModalActivation, setOpenModalActivation] = useState(false);
  const { state, dispatch } = useContext(SuperAdminContext);

  const { user } = useAuth();

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  // Updating a user
  const updateUser = async (id: number) => {
    dispatch({ type: 'SUPER_ADMIN_MODAL_UPDATE_USER', payload: true });
    dispatch({ type: 'UPDATE_USER', payload: id });
    setOpen(!open);
  };

  return (
    <div>
      {state.SuperAdminModalUpdateUser ? (
        <Modal>
          <FormCard>
            <UpdateUserForm id={state?.idToBeUpdated} />
          </FormCard>
        </Modal>
      ) : (
        ''
      )}
      {state.SuperAdminConfirmDeleteModal ? (
        <Modal>
          <ConfirmDelete id={1} />
        </Modal>
      ) : (
        ''
      )}
      {openModalActivation && (
        <Modal>
          <ConfirmActivation
            setOpen={() => setOpenModalActivation(false)}
            id={1}
          />
        </Modal>
      )}
      <div ref={domNode}>
        <motion.div
          className="cursor-pointer z-30 mt-2 relative hover:text-green-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
        >
          <Image src={menuBtn} width={30} height={20} alt="icon" />
        </motion.div>
        {open ? (
          <div style={{
            zIndex: "2000"
          }} className="-z-100  rounded-md border  border-slate-300 mt-2 absolute flex flex-col justify-start items-start py-2 px-4 bg-slate-100 shadow-xl">
            {role == 1 && user?.role == 1 ? (
              <>Not allowed</>
            ) : (
              <>
                {isActive && (
                  <div
                    onClick={() => updateUser(id)}
                    className="mb-2 flex cursor-pointer hover:text-greenpale   items-center justify-between"
                  >
                    <Image
                      className="w-3 mr-4 "
                      src={editIcon}
                      alt="Delete icon"
                    />
                    <div>Edit</div>
                  </div>
                )}
                <hr className="bg-black w-full mb-2" />
                {isActive && (
                  <div
                    onClick={() => {
                      dispatch({ type: 'DELETE', payload: id }),
                        dispatch({
                          type: 'SUPER_ADMIN_MODAL_DELETE_USER',
                          payload: true,
                        });
                      setOpen(!open);
                    }}
                    className="flex cursor-pointer hover:text-red-600 items-baseline justify-between"
                  >
                    <Image
                      className="w-3 mr-4 text-red-600"
                      src={deleteIcon}
                      alt="Delete icon"
                    />
                    <div className="pr-4">Deactivate</div>
                  </div>
                )}
                {!isActive && (
                  <div
                    onClick={() => {
                      dispatch({ type: 'ACTIVATE', payload: id });
                      setOpenModalActivation(true);
                    }}
                    className="flex cursor-pointer hover:text-green-600 items-baseline justify-between"
                  >
                    <FaRegCheckCircle className="w-4 mr-4 text-green-600" />
                    <div className="pr-4">Activate</div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default EditSettings;
