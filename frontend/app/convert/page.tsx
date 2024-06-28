// import Footer from '../../components/Footer';
// import NavBar from '../../components/NavBar';

// import FileUpload from './components/FileUpload';
// import TipsComponent from './components/TipsComponent';

// const ConvertPage = () => {
//   return (
//     <div>
//       {/* <FileContextProvider> */}
//       <div>
//         <TipsComponent />
//       </div>

//       {/* <div className="">
//         <NavBar />
//       </div> */}

//       {/* <div className="pt-8   max-w-xl px-2 mx-auto h-[80vh] flex items-center justify-center">
//         <FileUpload dragActiv={ false } regexData={ null } />
//       </div> */}
//       {/* <div className=" flex justify-center">
//         <Footer _companies={undefined} />
//       </div> */}
//       {/* </FileContextProvider> */}
//     </div>
//   );
// };

// export default ConvertPage;

import React from 'react';

import dynamic from 'next/dynamic';

// import NavBar from '@/components/NavBar';
// import Footer from '../../components/Footer';
// import FileUpload from './components/FileUpload';
import { FileContextProvider } from './context/file.context';

// import TipsComponent from './components/TipsComponent';
const TipsComponent = dynamic(() => import('./components/TipsComponent'), { ssr: false }); 
const NavBar = dynamic(() => import('@/components/NavBar'), { ssr: false }); 
const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });
const FileUpload = dynamic(() => import('./components/FileUpload'), { ssr: false });

const ConvertPage = () => {
  return (
    <div>
      <FileContextProvider>
        <div>
          <TipsComponent />
        </div>

        <div className="">
          <NavBar />
        </div>

        <div className="pt-8   max-w-xl px-2 mx-auto h-[80vh] flex items-center justify-center">
          <FileUpload dragActiv={ false } regexData={ null } />
        </div>
        <div className=" flex justify-center">
          <Footer _companies={undefined} />
        </div>
      </FileContextProvider>
    </div>
  );
};

export default ConvertPage;

