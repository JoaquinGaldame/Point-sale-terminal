import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthUserState } from '@app/store/states/auth.state';
import { AlertType } from '@app/core/Common/Components/alert/alert.types';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '@app/store/app.state';
import { selectAuthUserFeature } from '@app/core/features/auth/auth.selectors';
import { login, loginSuccess } from '@app/core/features/auth/auth.actions';

@Component({
  selector     : 'auth-unlock-session',
  templateUrl  : './unlock-session.component.html',
  encapsulation: ViewEncapsulation.None,
  // animations   : fuseAnimations,
  standalone   : true,
  imports      : [NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterLink],
})
export class AuthUnlockSessionComponent implements OnInit
{
  @ViewChild('unlockSessionNgForm') unlockSessionNgForm: NgForm;
  authState$: Observable<AuthUserState> = this.store.select(selectAuthUserFeature);

  alert: { type: AlertType; message: string } = {
    type   : 'success',
    message: '',
  };

  name: string;
  showAlert: boolean = false;
  unlockSessionForm: UntypedFormGroup;
  private _email: string;
  private unsubscribe$ = new Subject<void>();
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
  )
  {
    this
  }

  /**
  * On init
  */
  ngOnInit(): void {
    // Suponiendo que el usuario ya está en el estado auth al cargar el componente
    this.authState$
      .pipe(
        filter(state => !state.loading),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((state: AuthUserState) => {
        if (state.user) {
          this.name = state.user.user.username;
          this._email = state.user.user.data?.email ?? '';

          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
          this._router.navigateByUrl(redirectURL);
        } else if (state.error) {
          this.unlockSessionForm.enable();
          this.alert = { type: 'error', message: state.error.message };
          this.showAlert = true;
        }
      });

    this.unlockSessionForm = this._formBuilder.group({
      name: [{ value: this.name, disabled: true }],
      password: ['', Validators.required],
    });
  }

  /**
   * Unlock
   */
  unlock(): void {
    if (this.unlockSessionForm.invalid) return;

    this.unlockSessionForm.disable();
    this.showAlert = false;

    const password = this.unlockSessionForm.get('password')?.value;

    this.store.dispatch(
      login({ username: this.name ?? '', password })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}