import { Component } from '@angular/core';
import { navbarData } from './nav-data';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  collapsed_ = false;
  navData =  navbarData;


}
