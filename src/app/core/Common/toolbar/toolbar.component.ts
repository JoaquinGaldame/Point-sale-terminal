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
import { MENU_DEFINED } from '../navigation';
import { SidenavService } from '../../services/toolbar.service';
import { ISettings } from '@app/core/Settings/settings.interface';
import { settingService } from '@app/core/services/settings.service';

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
  public Menu: any[];
  constructor(
    private router: Router,
    public sidenavService: SidenavService,
    private settingService: settingService) {
    // Subscription to configuration
    this.settingService.config$.subscribe(config => {
      this.config = config;
    });
    this.Menu = MENU_DEFINED;
  }

  setOpen() {
    this.sidenavService.toggle();
    //this.submenuOpen = false;
  }

  setSubmenuOpen() {
    this.submenuOpen = !this.submenuOpen;
  }

  toggleFixed() {
    this.sidenavService.toggleFixed();
  }


  getMergedClasses(baseClasses: { [key: string]: boolean }, themeKey: number): any {
    return {
      ...baseClasses,
      [this.getThemeColor(themeKey,'bg')]: true
    };
  }

  getThemeColor(option: number , type: string): string {
    const colorValue = this.config?.themes[option]?.value?.toString() || '';
    console.log('esto trae color ' + colorValue)
    switch(type)
    {
      case 'text':
        const text = `hover:bg-${colorValue}-100 hover:text-${colorValue}-500 focus:bg-${colorValue}-100 focus:text-${colorValue}-500`
        return text;
        break;
      case 'text-menu':
        const text_menu = `hover:bg-${colorValue}-100 hover:text-${colorValue}-500`
        return text_menu;
        break;
      case 'bg':
        return `bg-${colorValue}-500`;
        break;
      default:
        return '';
    }
  }

  // Método para navegar a la ruta
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
