import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './core/Common/toolbar/toolbar.component';
import { LayoutComponent } from './core/Common/layout/layout.component';
import { SidenavService } from './core/Common/toolbar/toolbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ToolbarComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Point-Sale-Terminal';
  constructor(private sidenavService: SidenavService){}
  get sidenavOpen(): boolean {
    return this.sidenavService.isOpen;
  }

  get sidenavFixed(): boolean {
    return this.sidenavService.isFixed;
  }

}
