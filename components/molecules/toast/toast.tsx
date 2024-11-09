import Swal from 'sweetalert2';

type ToastProps = {
    icon: 'success' | 'error' | 'warning';
    position: 'top-end';
    message: string;
};

const Toast = ({ icon, message, position }: ToastProps) => {
    Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: 3000,
    }).fire({
        icon: icon,
        title: message,
        padding: '10px 20px',
    });

    return null; // Since this is a side effect, return null to satisfy React's component expectations
};

export default Toast;
