import React, { ReactNode, useContext } from 'react';
import closeIcon from '../../../../public/icons/closeIcon.svg';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SuperAdminContext } from '../../context/admin.context';
type Props = {
  children: ReactNode;
};

export const FormCard: React.FC<Props> = ({ children }) => {
  const { dispatch } = useContext(SuperAdminContext);
  return (
    <div className="bg-slate-100 border border-slate-300 relative rounded-lg w-full shadow-lg p-8 max-w-md">
      <motion.div
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          dispatch({
            type: 'SUPER_ADMIN_MODAL',
            payload: false,
          });
          dispatch({
            type: 'SUPER_ADMIN_MODAL_CREATE_USER',
            payload: false,
          });
          dispatch({
            type: 'SUPER_ADMIN_MODAL_UPDATE_USER',
            payload: false,
          });
        }}
        className="absolute cursor-pointer flex items-center justify-center  -right-4 -top-4 h-8 w-8"
      >
        <Image src={closeIcon} alt="close icon" />
      </motion.div>
      {children}
    </div>
  );
};

export default FormCard;
