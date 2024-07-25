import dynamic from 'next/dynamic';

const PageComponent = dynamic(() => import('./PageComponent'), { ssr: false }); 

// import PageComponent from './PageComponent';


const SuperAdminPage = () => {

  return (
    <div>
      <PageComponent initialData={ [] } />
    </div>
  );
};

export default SuperAdminPage;
