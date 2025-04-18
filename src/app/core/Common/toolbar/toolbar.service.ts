import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  public isOpen = false;
  public isFixed = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleFixed() {
    this.isFixed = !this.isFixed;
    this.isOpen = this.isFixed === true ? true : false;
  }

  getIsOpen(): boolean {
    return this.isOpen;
  }

  getIsFixed(): boolean {
    return this.isFixed;
  }
}