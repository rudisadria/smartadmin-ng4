import { JsonApiService } from '../../../core/api/json-api.service';
import {
  Directive, ElementRef, OnInit,
  AfterContentInit
} from '@angular/core';
import {Subscription} from "rxjs/Rx";

import {LayoutService} from "../../layout/layout.service";
import { MenuItem } from './navigation.component';
import {Router, NavigationEnd} from "@angular/router";

declare var $:any;

@Directive({
  selector: '[saSmartMenu]'
})
export class SmartMenuDirective implements OnInit, AfterContentInit {

  private $menu:any;
  private layoutSub:Subscription;
  private routerSub:Subscription;
  public menuItems: MenuItem[] = [];
  constructor(
    private menu:ElementRef,
    private router: Router,
    public layoutService:LayoutService,
    private jsonApiService: JsonApiService
  ) {
        const url = '/menu-items.json';
    
    this.jsonApiService.unsecureGet(url).subscribe(response=> {
      this.menuItems = response;
    });
    
    this.$menu = $(this.menu.nativeElement);
    
  }

  ngOnInit() {
      setTimeout(()=>{
          if(!this.togglersBinded){
              this.$menu.find('li:has(> ul)').each((i, li)=> {
                let $menuItem = $(li);
                let $a = $menuItem.find('>a');
                
                let sign = $('<b class="collapse-sign"><em class="fa fa-plus-square-o"/></b>');

                $a.on('click', (e)=> {
                  this.toggle($menuItem);
                  e.stopPropagation();
                  return false;
                }).append(sign);
                
              });
              this.togglersBinded = true;
            }
          
          this.layoutSub = this.layoutService.subscribe((store)=> {
              this.processLayout(store)

            });

            this.routerSub = this.router.events.subscribe((event: any)=>{

              setTimeout(()=>{
                this.processLayout(this.layoutService.store)
              }, 1);
              this.routerSub.unsubscribe()
            });

            $('[routerLink]', this.$menu).on('click',()=>{
              if(this.layoutService.store.mobileViewActivated){
                this.layoutService.onCollapseMenu()
              }
            })
      }, 500);
  }

  private togglersBinded = false;
  ngAfterContentInit() {

  }

  ngOnDestroy() {
//    this.layoutSub.unsubscribe();
  }

  private processLayout = (store)=>{
    
    if (store.menuOnTop) {
      this.$menu.find('li.open').each((i, li)=> {
        this.toggle($(li), false)
      })
    } else {
      this.$menu.find('li.active').each((i, li)=> {
        $(li).parents('li').each((j, parentLi)=>{
          this.toggle($(parentLi), true)
        })
      })
    }

    if(store.mobileViewActivated){
      $('body').removeClass("minified");
    }
  };

  private toggle($el, condition = !$el.data('open')) {
    $el.toggleClass('open', condition);

    if(condition){
      $el.find('>ul').slideDown();
    } else {
      $el.find('>ul').slideUp();
    }

    $el.find('>a>.collapse-sign>em')
      .toggleClass('fa-plus-square-o', !condition)
      .toggleClass('fa-minus-square-o', condition);

    $el.data('open', condition);

    if (condition) {
      $el.siblings('.open').each((i, it)=> {
        let sib = $(it);
        this.toggle(sib, false)
      })
    }
  }

}
