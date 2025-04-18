import { Component } from '@angular/core';
import { SidenavService } from '../toolbar/toolbar.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(public sidenavService: SidenavService){}
}
