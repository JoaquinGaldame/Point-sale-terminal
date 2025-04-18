import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageComponent } from '../../core/Common/Components/message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-form-egreso-ingreso',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDividerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-egreso-ingreso.component.html',
  styleUrl: './form-egreso-ingreso.component.scss'
})
export class FormEgresoIngresoComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}
  headerForm: FormGroup = this.fb.group({
    nroCaja:    [0],
    fechaInicio:       ['', Validators.required],
    fechaFin:     ['']
  });

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.headerForm.valid) {
      console.log('Form submitted:', this.headerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}