import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import FileUpload from './components/FileUpload';
import TipsComponent from './components/TipsComponent';
import { FileContextProvider } from './context/file.context';

const Page = () => {
  return (
    <div>
      {/* <FileContextProvider> */}
        <div>
          <TipsComponent />
        </div>

        <div className="">
          <NavBar />
        </div>

        <div className="py-8   max-w-xl px-2 mx-auto h-[90vh] flex items-center justify-center">
          <FileUpload />
        </div>

        <Footer _companies={undefined} />
      {/* </FileContextProvider> */}
    </div>
  );
};

export default Page;
