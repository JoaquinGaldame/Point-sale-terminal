import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private redirectURL: string | null = null;

  setRedirectURL(url: string): void {
    this.redirectURL = url;
  }

  getRedirectURL(): string {
    return this.redirectURL ?? '/signed-in-redirect';
  }

  clearRedirectURL(): void {
    this.redirectURL = null;
  }
}