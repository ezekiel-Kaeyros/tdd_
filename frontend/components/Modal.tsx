'use client';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

const dropIn = {
  hidden: {
    //scale: 0,
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    //scale: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 50,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 0.4,
      stiffness: 500,
    },
  },
};

const Modal: React.FC<Props> = ({ children }) => {
  return createPortal(
    <div className="center-all overflow-hidden z-50 w-full backdrop-blur h-screen flex items-center justify-center   ">
      <div className="w-full max-w-sm mx-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className=""
        >
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className=""
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
