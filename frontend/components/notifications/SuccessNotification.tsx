import { ToastContainer, toast } from 'react-toastify';

export const notifySuccess = (message: string) =>
  toast.success(`${message}`, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
function SuccessNotification() {
  return (
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
  );
}

export default SuccessNotification;
