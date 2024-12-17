import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CustomToast: React.FC<{ message: string }> = ({ message }) => (
  <div style={{ fontSize: '14px', padding: '8px' }}>
    {message}
  </div>
);

export const showCustomToast = (message: string) => {
  toast(<CustomToast message={message} />);
};

export function CustomToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
