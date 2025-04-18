import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router'; 
import { Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { MENU_DEFINED } from '../navigation';
import { SidenavService } from './toolbar.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule,MatToolbarModule,MatButtonModule,MatIconModule,MatSidenavModule,MatListModule, MatFormFieldModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  public open: boolean = true;
  public submenuOpen: boolean = false;
  public Menu: any[];
  constructor(private router: Router,
    public sidenavService: SidenavService
  ) {
    this.Menu = MENU_DEFINED;
  }

  setOpen() {
    this.sidenavService.toggle();
    this.submenuOpen = false;
  }

  setSubmenuOpen() {
    this.submenuOpen = !this.submenuOpen;
  }

  toggleFixed() {
    this.sidenavService.toggleFixed();
  }

  // Método para navegar a la ruta
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
