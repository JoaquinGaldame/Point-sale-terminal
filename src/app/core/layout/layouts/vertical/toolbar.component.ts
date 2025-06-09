import { Component } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router'; 
import { Router } from '@angular/router';
import { MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule} from '@angular/material/list';
import { ToolbarService } from '@app/core/services/toolbar.service';
import { NavigationService } from '@app/core/navigation/navigation.service';
import { Menu, Navigation } from '@app/core/navigation/navigation.types';
import { ISettings } from '@app/core/Settings/settings.interface';
import { settingService } from '@app/core/services/settings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule,MatToolbarModule,MatButtonModule,MatIconModule,MatSidenavModule,MatListModule, MatFormFieldModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  public config: ISettings | null = null;
  public open: boolean = true;
  public submenuOpen: boolean = false;
  public loading$: Observable<boolean>;
  public Menu: Menu[];
  public navigationMenu: Navigation | null = null;
  constructor(
    private router: Router,
    public toolbarService: ToolbarService,
    private settingService: settingService,
    private _navigationService: NavigationService
  ) {
    // Subscription to configuration
    this.settingService.config$.subscribe(config => {
      this.config = config;
    });
    this._navigationService.get().subscribe(menu => {
      this.navigationMenu = menu;
    });
  }

  setOpen() {
    this.toolbarService.toggle();
    //this.submenuOpen = false;
  }

  setSubmenuOpen() {
    this.submenuOpen = !this.submenuOpen;
  }

  toggleFixed() {
    this.toolbarService.toggleFixed();
  }

  // Método para navegar a la ruta
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
