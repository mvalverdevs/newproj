import {NgIf} from '@angular/common';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertComponent, FuseAlertType} from '@fuse/components/alert';
import {AuthService} from 'app/core/auth/auth.service';
import {UserLoginFormService} from "../../../../api/forms/user/login/login.service";
import {UserService} from "../../../../api/controllers/User";
import {CoreUserService} from 'app/core/user/user.service';
// import {PermissionsPermissionsFormService} from "../../../../api/forms/permissions/permissions/permissions.service";
// import {Permission} from "../../../../api/defs/Permission";
// import {Observable} from "rxjs";

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        RouterLink,
        FuseAlertComponent,
        NgIf, FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule, MatCheckboxModule,
        MatProgressSpinnerModule
    ],
    providers: [
        UserService,
        CoreUserService,
        UserLoginFormService
    ]
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _userLoginFormService: UserLoginFormService,
        private _authService: AuthService,
        private _coreUserService: CoreUserService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        // private _permissionsPermissionsFormService: PermissionsPermissionsFormService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            // username: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._userLoginFormService.submit({data: this.signInForm.value})
            .subscribe(
                (res) => {
                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';


                    // Set the authenticated flag to true
                    this._authService._authenticated = true;
                    this._authService.authenticated = true;
                    this._authService.accessToken = res.csrftoken;
                    // this._authService.setPermissions(this.getPermissions());
                    // Store the user on the user service
                    // this._coreUserService.user = res.csrftoken;

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);

                },
                (response) => {
                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: response.error[0],
                    };

                    // Show the alert
                    this.showAlert = true;
                },
            );
    }


    // getPermissions():Observable<Permission>{
    //     return this._permissionsPermissionsFormService.submit();
    // }
}
