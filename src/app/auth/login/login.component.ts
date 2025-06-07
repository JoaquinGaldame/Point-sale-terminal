import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppState } from '@app/store/app.state';
import { login } from '@app/core/features/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      username: '',
      password: ''
    });
  }

  onSubmit() {
    const { username, password } = this.form.value;
    this.store.dispatch(login({ username, password }));
  }
}
