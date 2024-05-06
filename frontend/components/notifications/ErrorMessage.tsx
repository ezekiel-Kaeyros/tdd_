import Image from 'next/image';
import reportIcon from '../../public/icons/report.svg';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ErrorMessage = () => {
  return (
    <motion.div
      initial={{ y: 100, zIndex: -2 }}
      animate={{ y: 0, zIndex: 0 }}
      className="flex w-full rounded-lg my-2 px-4 p-2 bg-red-300 text-red-950 justify-between items-center"
    >
      <Image src={reportIcon} alt="Error icon" />
      <div className="ml-4 text-sm">
        Sorry, invalid password or email, We can help you to{' '}
        <Link className="underline" href="/resetpassword">
          recover your password
        </Link>{' '}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;
