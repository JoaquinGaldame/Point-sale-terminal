import { Component } from '@angular/core';
import { ToolbarService } from '../../../services/toolbar.service';
import { settingService } from '@app/core/services/settings.service';
import { ISettings } from '@app/core/Settings/settings.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horizontal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal.component.html',
  styleUrl: './horizontal.component.css'
})
export class HorizontalComponent {
  config: ISettings | null = null;
  constructor(
    public toolbarService: ToolbarService,
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
