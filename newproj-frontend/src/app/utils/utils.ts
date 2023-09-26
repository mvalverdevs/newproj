import {FormGroup, FormArray} from '@angular/forms';

export class Utils {
  static processServerErrors(controls: FormGroup, serverErrors: Object): void {
    if (typeof serverErrors === 'object') {
      Object.keys(serverErrors).forEach(field => {
        if (controls[field] instanceof FormArray) {
          // Recursively check errores in FormArrays
          for (let i = 0; i < serverErrors[field].length; i++) {
            Utils.processServerErrors(controls[field].controls[i].controls, serverErrors[field][i]);
          }
        } else if (controls[field] instanceof FormGroup) {
          // Recursively check errores in FormArrays
          Utils.processServerErrors(controls[field].controls, serverErrors[field]);
        } else {
          if (controls[field]) {
            controls[field].setErrors({'serverError': true});
            /**
             *  If it's a server error, we have to show it even if the user hasn't entered the field yet
             */
            controls[field].markAsTouched();
          }
        }

      });
    }

  }

}
