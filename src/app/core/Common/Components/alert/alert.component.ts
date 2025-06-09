import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AlertType } from './alert.types';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  standalone   : true,
  imports: [NgClass, NgIf, MatIcon]
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() tipo: AlertType;
  @Input() titulo: string = '';
  @Input() mensaje: string = '';

  visible = true;
  private timeoutId: any;

  ngOnInit(): void {
    this.timeoutId = setTimeout(() => {
      this.visible = false;
    }, 4000); // 4 segundos antes de desvanecerse
  }

  close() {
    this.visible = false;
    clearTimeout(this.timeoutId);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  get estilos() {
    switch (this.tipo) {
      case 'error':
        return 'bg-red-500 text-gray-50';
      case 'success':
        return 'bg-green-500 text-gray-50';
      case 'warning':
        return 'bg-yellow-500  text-gray-900';
      case 'notification':
        return 'bg-white  text-gray-600';
      default:
        return '';
    }
  }

  get icono() {
    switch (this.tipo) {
      case 'error':
        return 'error';
      case 'success':
        return 'check';
      case 'warning':
        return 'warning';
      case 'notification':
        return 'mail';
      default:
        return '';
    }
  }
}