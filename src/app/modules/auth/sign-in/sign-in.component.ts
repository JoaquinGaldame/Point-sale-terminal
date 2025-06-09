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
import { AlertService } from '@app/core/Common/Components/alert/alert.service';
import * as AuthActions from '@app/core/features/auth/auth.actions';
import { AlertType } from '@app/core/Common/Components/alert/alert.types';
import { filter, Observable, take } from 'rxjs';
import { selectAuthUser, selectErrorAuth } from '@app/core/features/auth/auth.selectors';
import { ErrorResponse } from '@app/core/models/Api.interface';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    // animations   : fuseAnimations,
    standalone   : true,
    imports      : [NgIf, NgClass, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    error$: Observable<ErrorResponse | null>;
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private store: Store<AppState>,
        private _formBuilder: UntypedFormBuilder,
        private _alertService: AlertService,
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

      // this.store.select(selectAuthUser).subscribe(user => {
      //   console.log('Usuario autenticado:', user);
      //   if (user) {
      //     console.log('Ingresa por aqui');
      //     this._router.navigateByUrl('/home');
      //   }
      // });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
  test(): void{
    this._alertService.showAlert('notification', 'Éxito', 'Los datos se guardaron correctamente');
  }
  /**
   * Sign in
   */
  signIn(): void {
    if (this.signInForm.invalid) return;

    // // Set the alert
    // this.alert = {
    //     type   : 'error',
    //     message: 'Wrong email or password',
    // }

    this.signInForm.disable();
    this.showAlert = false;

    const { email, password, rememberMe } = this.signInForm.value;
    console.log('esto tiene form ' + JSON.stringify(this.signInForm.value))
    console.log('Esto va a mandar ' + email + password)
    const rememberMeValue = rememberMe === true ? true : false;
    this.store.dispatch(AuthActions.sigIn({ username:email, password, rememberMe: rememberMeValue }));

    this.store.select(selectErrorAuth).pipe(
      filter(error => !!error),
      take(1)
    ).subscribe(error => {
      const safeError = error as NonNullable<typeof error>;
      this.signInForm.enable();
      this.signInNgForm.resetForm();
      this._alertService.showAlert('error', 'Error al iniciar sesión', `${safeError.message ?? 'Ha ocurrido un error al iniciar sesión'}`);
      // this.alert = { type: 'error', message: 'Wrong email or password' };
      // this.showAlert = true;
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
