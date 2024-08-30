import { Component, EventEmitter, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translate: TranslateService) {
    // Establecer el idioma predeterminado
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

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
