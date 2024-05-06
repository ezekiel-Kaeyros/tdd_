import { useContext } from 'react';
import { FileContext } from '../convert/context/file.context';

export const useFileContext = () => {
  const { state, dispatch } = useContext(FileContext);
  let isDownloading = state?.isDownloading;
  let fileConverted = state?.fileConverted;
  let filename = state?.filename;
  let file = state.file;
  return { isDownloading, dispatch, fileConverted, file, filename };
};
