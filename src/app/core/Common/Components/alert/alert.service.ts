import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AlertType, AlertData } from './alert.types';


@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertaSubject = new BehaviorSubject<AlertData | null>(null);
  alerta$ = this.alertaSubject.asObservable();
  alertBody: AlertData;
  showAlert(tipo: AlertType, titulo: string, mensaje: string) {
    this.alertBody = {
      tipo,
      titulo,
      mensaje
    }
    this.alertaSubject.next(null); // limpia la actual primero
    setTimeout(() => this.alertaSubject.next(this.alertBody), 0); // fuerza nuevo render
  }

  clean() {
    this.alertaSubject.next(null);
  }
}