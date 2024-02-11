import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {UserService} from "../../../api/services/user.service";
import { UserLogin } from 'src/api/models';
import { LoadingController, ToastController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {

  loginForm: FormGroup
  register = RegisterPage
  hasError = false
  errorMessage = ''

  constructor(
    private _loadingCtrl: LoadingController,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _toastController: ToastController,
    private _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  async onSubmit(userLogin: UserLogin){
    const loading = await this._loadingCtrl.create({
      message: 'Saving...',
      duration: 4000,
    });
    loading.present();
    this._userService.userLoginCreate$Json$Response({body: userLogin}).subscribe({
      next: (response) => {
      },
      error: (e) => {
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
        loading.dismiss()
      },
      complete: () => {
        loading.dismiss()
        // NAVIGATE TO THE APP
        this._router.navigate(['/profile']);
      }
    });
  }


}
