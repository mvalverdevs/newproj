import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { CheckUsername } from 'src/api/models';
import { UserService } from 'src/api/services';

@Component({
  selector: 'app-step-check-username',
  templateUrl: './step-check-username.component.html',
  styleUrls: ['./step-check-username.component.scss'],
})
export class StepCheckUsernameComponent  implements OnInit {

  checkUsernameForm: FormGroup
  @Output() step = new EventEmitter<string>();
  @Output() username = new EventEmitter<string>();

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _loadingCtrl: LoadingController,
    private _toastController: ToastController
  ) {
    this.checkUsernameForm = this._formBuilder.group({
      username: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  async checkUsername(username: CheckUsername){
    const loading = await this._loadingCtrl.create({
      message: 'Saving...',
      duration: 4000,
    });
    loading.present();
    this._userService.userCheckUsernameCreate$Json$Response({body: username}).subscribe({
      next: (response) => {
        if (response.body.exists){
          this._toastController.create({
            message: 'El usuario ya existe',
            duration: 1500,
            position: 'bottom',
          }).then(
            (toast) => {
              toast.present()
            }
          );
        }else {
          this.step.emit('password');
          this.username.emit(username.username);
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
        // NAVIGATE TO THE APP
        //this._router.navigate(['/...']);
      }
    });
  }

}
