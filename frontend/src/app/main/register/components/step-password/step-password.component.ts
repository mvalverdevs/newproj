import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/api/models';
import { UserService } from 'src/api/services';

@Component({
  selector: 'app-step-password',
  templateUrl: './step-password.component.html',
  styleUrls: ['./step-password.component.scss'],
})
export class StepPasswordComponent implements OnInit {

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
    });
  }

  ngOnInit() {}

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
