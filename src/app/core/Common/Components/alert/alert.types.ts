export type AlertType = 'success' | 'error' | 'warning' | 'notification';

export interface AlertData {
  tipo: AlertType;
  titulo: string;
  mensaje: string;
}