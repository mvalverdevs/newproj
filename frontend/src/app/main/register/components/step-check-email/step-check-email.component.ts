import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { CheckEmail } from 'src/api/models';
import { UserService } from 'src/api/services';

@Component({
  selector: 'app-step-check-email',
  templateUrl: './step-check-email.component.html',
  styleUrls: ['./step-check-email.component.scss'],
})
export class StepCheckEmailComponent  implements OnInit {

  checkEmailForm: FormGroup
  emailChecked = false
  @Output() step = new EventEmitter<string>();
  @Output() email = new EventEmitter<string>();
  

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _loadingCtrl: LoadingController,
    private _toastController: ToastController
  ) {
    this.checkEmailForm = this._formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });
  }

  ngOnInit() {}

  async checkEmail(email: CheckEmail){
    if (!this.checkEmailForm.valid){
      return
    }
    const loading = await this._loadingCtrl.create({
      message: 'Saving...',
      duration: 4000,
    });
    loading.present();

    this._userService.userCheckEmailCreate$Json$Response({body: email}).subscribe({
      next: (response) => {
        if (response.body.exists){
          this._toastController.create({
            message: 'El correo ya existe',
            duration: 1500,
            position: 'bottom',
          }).then(
            (toast) => {
              toast.present()
            }
          );
        }else {
          this.emailChecked = true
          // AQUI METER EL CAMPO CONTRASEÑA
          this.step.emit('checkUsername');
          this.email.emit(email.email);
        }
      },
      error: (e) => {
        loading.dismiss();
        this._toastController.create({
          message: e.error,
          duration: 1500,
          position: 'bottom',
        }).then(
          (toast) => {
            toast.present()
          }
        );
        console.error(e)
      },
      complete: () => {
        loading.dismiss();
      }
    });
  }

}
