import Swal from 'sweetalert2';

export class PopupHelper {
  timer = 1500;
  showSuccessPopup(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: this.timer
    });
  }
  showErrorPopup(message: string): void {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: this.timer
    });
  }
}
