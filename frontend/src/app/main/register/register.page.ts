import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/api/models';
import { UserService } from 'src/api/services';

@Component({
  selector: 'app-login',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage implements OnInit {

  CHECK_EMAIL_STEP = 'checkEmail'
  CHECK_USERNAME_STEP = 'checkUsername'
  PASSWORD_STEP = 'password'

  current_step = 'checkEmail'

  userForm: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _toastController: ToastController,
    private _loadingCtrl: LoadingController
  ) {
    this.userForm = this._formBuilder.group({
      first_name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  changeStep(step: string){
    this.current_step = step
  }

  selectEmail(email: string){
    this.userForm.patchValue({
      email: email
    });
  }

  selectUsername(username: string){
    this.userForm.patchValue({
      username: username
    });
  }

  async createUser(user: User){
    const loading = await this._loadingCtrl.create({
      message: 'Saving...',
      duration: 4000,
    });
    loading.present();
    this._userService.userCreate$Json$Response({body: user}).subscribe({
      next: (response) => {
        
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
