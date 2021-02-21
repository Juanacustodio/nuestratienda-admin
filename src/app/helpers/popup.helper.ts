import Swal, {SweetAlertOptions} from 'sweetalert2';
import * as _ from 'lodash';

export class PopupHelper {
  timer = 1500;
  private showPopup(icon: 'success'|'error', title: string, text: string = ''): void {
    const options: SweetAlertOptions = {
      icon,
      title,
      showConfirmButton: false,
      timer: this.timer
    };
    if (_.isEmpty(text)) {
      options.text = text;
    }

    Swal.fire(options);
  }
  showSuccessPopup(title: string, text: string = ''): void {
    this.showPopup('success', title, text);
  }
  showErrorPopup(title: string, text: string = ''): void {
    this.showPopup('error', title, text);
  }
}
