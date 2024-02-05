import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

  checkEmailForm: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.checkEmailForm = this._formBuilder.group({
      email: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {

    }

  changeStep(step: string){
    this.current_step = step
  }

}
