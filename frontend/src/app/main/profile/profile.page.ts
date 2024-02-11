import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleEnum, User } from 'src/api/models';
import { UserService } from 'src/api/services';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  imageUrl = undefined
  menuButtons = [
    {
      text: 'Log out',
      role: 'logout',
    },
    {
      text: 'Edit profile',
      role: 'edit',
    },
  ];

  user: User = {
    deactivation_datetime: null,
    email: '',
    first_name: null,
    id: -1,
    is_active: true,
    last_bad_login_attempt_datetime: null,
    last_name: null,
    login_attempts: 0,
    password: '',
    phone: null,
    role: RoleEnum['User'],
    username: '',
    has_login_blocked: 'false'
  }

  constructor (
    private _userService: UserService,
    private _router: Router
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this._userService.userCurrentRetrieve$Response().subscribe({
      next: (response) => {
        this.user = response.body
        console.log(response)
      },
      error: (e) => {
      },
      complete: () => {
      }
    });
  }

  profileMenuResult(event: any){
    if (event.detail.role == 'logout'){
      this.logOut()
    }
  }

  logOut(){
    this._userService.userLogoutCreate$Json$Response().subscribe({
      next: (response) => {
      },
      error: (e) => {
      },
      complete: () => {
        localStorage.removeItem('accessToken')
        this._router.navigate(['/login']);
      }
    });
  }

}
