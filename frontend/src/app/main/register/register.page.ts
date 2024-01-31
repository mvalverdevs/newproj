import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { CheckUser } from 'src/api/models';
import { UserService } from 'src/api/services';

@Component({
  selector: 'app-login',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _loadingCtrl: LoadingController,
  ) {
    this.registerForm = this._formBuilder.group({
      email: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {

    }

  async checkUsername(email: CheckUser){
    const loading = await this._loadingCtrl.create({
      message: 'Saving...',
      duration: 4000,
    });
    loading.present();
    this._userService.userCheckUserCreate$Json$Response({body: email}).subscribe({
      next: (response) => {
        if (response.body.exists){
          alert('YES')
        }
      },
      error: (e) => 
      console.error(e),
      complete: () => {
        loading.dismiss();
        // NAVIGATE TO THE APP
        //this._router.navigate(['/...']);
      }
    });
  }

}
