import Image from 'next/image';
import uploadIcon from '../../../public/icons/cloud_download.svg';
import ThreeDotsLoadingAnimation from './ThreeDotsLoadingAnimation';
import { useContext } from 'react';
import { FileContext } from '../context/file.context';

const UploadPlaceholder: React.FC = () => {
  const { state } = useContext(FileContext);
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col items-start ">
        <div className="text-xl ">
          {state.converting ? (
            <div className="flex opacity-80 items-baseline">
              <div className="mr-3">
                {' '}
                {state.fileConverted ? (
                  ' Done'
                ) : (
                  <div className="flex items-center ">
                    <div className="mr-2">Processing</div>{' '}
                    <ThreeDotsLoadingAnimation />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="opacity-80 ">
              <div className="font-bold">Upload CSV files</div>
              <p className="text-sm">Drag and drop your file here</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <Image className="opacity-80" src={uploadIcon} alt="Upload icon" />
      </div>
    </div>
  );
};

export default UploadPlaceholder;
