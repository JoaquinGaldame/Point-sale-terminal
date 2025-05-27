import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './core/Common/toolbar/toolbar.component';
import { LayoutComponent } from './core/Common/layout/layout.component';
import { SidenavService } from './core/services/toolbar.service';
import { ISettings } from './core/Settings/settings.interface';
import { settingService } from './core/services/settings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ToolbarComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Point-Sale-Terminal';
  config: ISettings | null = null;
  constructor(
    private sidenavService: SidenavService,
    private settingService: settingService
  ){
    // Subscription to configuration
    this.settingService.config$.subscribe(config => {
      this.config = config;
    });
  }

  get sidenavOpen(): boolean {
    return this.sidenavService.isOpen;
  }

  get sidenavFixed(): boolean {
    return this.sidenavService.isFixed;
  }

  getThemeColor(option: number): string {
    const colorValue =  (this.config?.themes[option].value) ? this.config?.themes[option].value.toString() : '';
    console.log('eto trae color appcomponent ' + colorValue)
    return 'bg-'+colorValue+'-100'
  }
}
