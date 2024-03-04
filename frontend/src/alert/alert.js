import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer:  2500,
  timerProgressBar: true
});

export default Toast;