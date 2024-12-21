import {toast} from 'react-toastify';
import {CustomToast} from '../components/custom-toast/custom-toast.tsx';

export const showCustomToast = (message: string) => {
  toast(<CustomToast message={message} />);
};
