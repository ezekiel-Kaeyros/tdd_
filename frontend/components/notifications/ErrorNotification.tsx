import { ToastContainer, toast } from 'react-toastify';

export const notifyError = (message: string, autoCloseTime?: number) =>
  toast.error(`${message}`, {
    position: 'top-right',
    autoClose: autoCloseTime ? autoCloseTime : 3000,
    // autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
function ErrorNotification() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

export default ErrorNotification;
