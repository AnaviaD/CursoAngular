import { Component, EventEmitter, Output } from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();


  collapsed_ = false;
  screenWidth = 0;
  navData =  navbarData;

  toggleCollapse() {
    this.collapsed_= !this.collapsed_;
    this.onToggleSideNav.emit({collapsed: this.collapsed_, screenWidth:this.screenWidth});
  }

  closeSidebar()
  {
    this.collapsed_ = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed_, screenWidth:this.screenWidth});
  }

}
