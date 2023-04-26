import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Test() {
  const onClick = () =>
    toast('Toast is good', {
      hideProgressBar: true,
      autoClose: 2000,
      type: 'success',
    });

  return (
    <div>
      <button onClick={onClick}> Click Me</button>
      <ToastContainer />
    </div>
  );
}
