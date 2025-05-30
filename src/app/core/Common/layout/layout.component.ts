import { Component } from '@angular/core';
import { SidenavService } from '../../services/toolbar.service';
import { settingService } from '@app/core/services/settings.service';
import { ISettings } from '@app/core/Settings/settings.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  config: ISettings | null = null;
  constructor(
    public sidenavService: SidenavService,
    private settingService: settingService
  ){
    // Subscription to configuration
    this.settingService.config$.subscribe(config => {
      this.config = config;
    });
  }
  getThemeColor(option: number): string {
    const colorValue = (this.config?.themes[option].value) ? this.config?.themes[option].value.toString() : '';
    return 'bg-'+colorValue+'-700'
  }
}
