import { ReactNode } from 'react';
import NavigationBar from '../components/NavigationBar';
import NavBar from '@/components/NavBar';
import { SuperAdminProvider } from '../context/admin.context';

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <SuperAdminProvider>
      <NavBar />
      <div className="ml-8">
        <NavigationBar />
      </div>
      {children}
      {/* <Footer _companies={''} /> */}
    </SuperAdminProvider>
  );
};

export default Layout;
