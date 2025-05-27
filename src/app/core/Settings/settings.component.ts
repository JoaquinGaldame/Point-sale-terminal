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
import { ISettings, ITheme, ITypography } from './settings.interface';
import { settingService } from '../services/settings.service';
import { SETTINGS, THEMES, TYPOGRAPHIES } from './DataSettings';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule,MatToolbarModule,MatButtonModule,MatIconModule,MatSidenavModule,MatListModule, MatFormFieldModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent { 
  config: ISettings | null = null;
  selectedColorSideNav: string = '';
  selectedColorHeaderNav: string = '';
  constructor(
    private settingService: settingService,
    private router: Router
  ) {
    // Subscription to configuration
    this.settingService.config$.subscribe(config => {
      this.config = config;
      this.selectedColorSideNav = this.config.themes[0].value;
      this.selectedColorHeaderNav = this.config.themes[1].value;
    });
  }

  cambiarTheme(): void {
    this.config?.themes.forEach((item) => {
      if(item.name === "sidenav"){
        item.value = this.selectedColorSideNav;
      }
      if(item.name === "headernav"){
        item.value = this.selectedColorHeaderNav;
      }
    })
    this.settingService.config = { 
      id: this.config?.id,
      idTheme: this.config?.idTheme,
      typography: this.config?.typography,
      themes: this.config?.themes,
      idTypography: this.config?.idTypography,
      sizeTypography: this.config?.sizeTypography,
      valuesTypography: this.config?.valuesTypography
    };
  }

  resetearConfiguracion(): void {
    this.settingService.reset();
  }

  estoTiene() :string{
    return JSON.stringify(this.config)
  }

  getThemeBg(option: number, type: string): string {
    const colorValue = this.config?.themes[option]?.value?.toString() || '';
    const text = colorValue.replace('bg-', 'text-');
    const border = colorValue.replace('bg-', 'border-');
    const bg = colorValue;
    switch(type)
    {
      case "text":
        return text + ' ' + border
        break;
      case "bg":
        console.log('esto va a meter '+  bg + ' hover:' + text + ' hover:' + border)
        return bg + ' hover:' + text + ' hover:' + border 
        break;
      default:
        return bg 
        break;
    }
  }
}
