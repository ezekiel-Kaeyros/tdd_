import { getToken } from '@/app/utils/getToken';
import { notifyError } from '@/components/notifications/ErrorNotification';
import { BACKEND_URL } from '@/types/backendUrl'; 
import { toast } from 'react-toastify';
// import toast from 'react-hot-toast'; 

export const postFile = async (
  formData: any,
  email: string | undefined | null,
  dispatch: any,
  state: any
) => {
  let URL = `${BACKEND_URL}/builder/?email=${email}`;

  await fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  })
    .then(async (response) => {
      console.log("response: ", response); 

      if (response.ok || response.status !== 400) {
        const data = await response.json();
        if (data.sucess && state.uploaded) {
          dispatch({ type: 'FILE_CONVERTED', payload: true });
        } else {
          dispatch({ type: 'FILE_CONVERTED', payload: false });
        }
      } else {
        let finalMessage = "Error Occured"
        const responseJson = await response.json()

        if (responseJson.error && responseJson.error.length > 0) {
          finalMessage = `The following Error occured: \n`
          for (let index = 0; index < responseJson.error.length; index++) {
            finalMessage = `${ finalMessage }\n${ responseJson.error[index] }`
          }
          dispatch({ type: 'TOGGLE_MESSAGE_WINDOW', payload: state.messageModalToggle });
          dispatch({ type: 'INJECT_DATA_IN_MESSAGE_WINDOW', payload: finalMessage });
          // notifyError(finalMessage, 30000)
        }
        if (responseJson.status && responseJson.status.length > 0) {
          finalMessage = `The following Error occured: \n`
          for (let index = 0; index < responseJson.status.length; index++) {
            finalMessage = `${ finalMessage }\n${ responseJson.status[index] }`
          }
          dispatch({ type: 'TOGGLE_MESSAGE_WINDOW', payload: state.messageModalToggle });
          dispatch({ type: 'INJECT_DATA_IN_MESSAGE_WINDOW', payload: finalMessage });
          // notifyError(finalMessage, 30000)
        }
        console.log("responseJson.status", responseJson)
        dispatch({ type: 'CANCEL_CONVERSION', payload: false })
      }
    })
    .catch((error) => {
      notifyError("Something went wrong")
      dispatch({ type: 'CANCEL_CONVERSION', payload: false })
    });
};
