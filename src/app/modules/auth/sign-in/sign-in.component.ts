import { NgIf, NgClass } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import { AlertComponent } from '@app/core/Common/Components/alert/alert.component';
import * as AuthActions from '@app/core/features/auth/auth.actions';
import { AlertType } from '@app/core/Common/Components/alert/alert.types';
import { filter, Observable, take } from 'rxjs';
import { selectErrorAuth } from '@app/core/features/auth/auth.selectors';
import { ErrorResponse } from '@app/core/models/Api.interface';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    // animations   : fuseAnimations,
    standalone   : true,
    imports      : [RouterLink, AlertComponent, NgIf, NgClass, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    error$: Observable<ErrorResponse | null>;
    alert: { type: AlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private store: Store<AppState>,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
    )
    {
    }

    get emailControl() {
      return this.signInForm.get('email');
    }
    
    get passwordControl() {
      return this.signInForm.get('password');
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      // Create the form
      this.signInForm = this._formBuilder.group({
        email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
        password  : ['admin', Validators.required],
        rememberMe: [''],
      });
        this.error$ = this.store.select(selectErrorAuth);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signIn(): void {
    if (this.signInForm.invalid) return;

    this.signInForm.disable();
    this.showAlert = false;

    const { email, password, rememberMe } = this.signInForm.value;
    this.store.dispatch(AuthActions.sigIn({ username:email, password, rememberMe }));

    this.store.select(selectErrorAuth).pipe(
      filter(error => !!error),
      take(1)
    ).subscribe(error => {
      this.signInForm.enable();
      this.signInNgForm.resetForm();
      this.alert = { type: 'error', message: 'Wrong email or password' };
      this.showAlert = true;
    });
  }



  isEmailInvalid(): boolean {
    const control = this.signInForm.get('email');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isPasswordInvalid(): boolean {
    const control = this.signInForm.get('password');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
