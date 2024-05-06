import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/app/(administrators)/components/settingsComponents/Sidebar';
import NavBar from '@/components/NavBar';
interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="relative">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="fixed w-full top-0 z-20">
        <NavBar />
      </div>
      <div className="flex justify-between">
        <Sidebar />

        <div className=" relative ml-auto w-10/12 px-[400px] md:px-[100px] mt-36">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
