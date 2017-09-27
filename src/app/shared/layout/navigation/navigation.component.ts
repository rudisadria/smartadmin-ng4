import {Component, OnInit,ElementRef} from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";
import {JsonApiService} from "../../../core/api/json-api.service";
import { SmartMenuDirective } from './smart-menu.directive';
import {Observable} from 'rxjs/Rx';


export class MenuItem {
  order: number;
  label: string;
  icon: string;
  url: string;
  subMenu: MenuItem[]
}

declare var $:any;

const MENUITEMS: MenuItem[] = [
      { order: 11, label: 'Dashboard', icon: 'fa fa-lg fa-fw fa-home', subMenu: [
          { order: 1, label: 'Analytics Dashboard', icon: '', url: '/home/dashboard/analytics', subMenu: []  },
          { order: 2, label: 'Social Wall', icon: '', url: '/home/dashboard/social', subMenu: []  }
        ], url: '#' },
      { order: 12, label: 'SmartAdmin Intel', icon: 'fa fa-lg fa-fw fa-cube txt-color-blue', url: '#', subMenu: []  },
      { order: 13, label: 'Outlook', icon: 'fa fa-lg fa-fw fa-inbox', url: '#', subMenu: []  },
      { order: 14, label: 'Graphs', icon: 'fa fa-lg fa-fw fa-bar-chart-o', url: '#', subMenu: []  },
      { order: 15, label: 'Tables', icon: 'fa fa-lg fa-fw fa-table', url: '#', subMenu: []  },
      { order: 16, label: 'Forms', icon: 'fa fa-lg fa-fw fa-pencil-square-o', url: '#', subMenu: []  },
      { order: 17, label: 'UI Elements', icon: 'fa fa-lg fa-fw fa-desktop', url: '#', subMenu: []  },
      { order: 18, label: 'Widgets', icon: 'fa fa-lg fa-fw fa-list-alt', url: '/home/widgets', subMenu: []  },
      { order: 19, label: 'Cool Features', icon: 'fa fa-lg fa-fw fa-cloud', url: '#', subMenu: []  },
      { order: 20, label: 'App Views', icon: 'fa fa-lg fa-fw fa-puzzle-piece', url: '#', subMenu: []  },
      { order: 21, label: 'E-Commerce', icon: 'fa fa-lg fa-fw fa-shopping-cart', url: '#', subMenu: []  },
      { order: 22, label: 'Miscellanaeous', icon: 'fa fa-lg fa-fw fa-windows', url: '#', subMenu: []  },
      { order: 23, label: 'Smart Chat API', icon: 'fa fa-lg fa-fw fa-home', url: '#', subMenu: []  }
    ];

@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html',
  providers: [SmartMenuDirective]
})
export class NavigationComponent implements OnInit {
  menuItems: MenuItem[] = [];
//  menuItems= MENUITEMS;
  url: string;
  
  constructor(private jsonApiService: JsonApiService,public smartMenuDirective: SmartMenuDirective) {
    this.url = '/menu-items.json';
    
//    this.jsonApiService.fetch(this.url).subscribe(response=> {
//      this.menuItems = response;
//      smartMenuDirective.ngAfterContentInit();
//    });
//    smartMenuDirective.ngAfterContentInit();
//    this.menuItems = MENUITEMS;
    
  }

  ngOnInit() {

  }
}
