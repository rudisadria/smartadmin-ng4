import {SmartadminModule} from '../shared/smartadmin.module';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

export const routes: Routes = [
    {
      path: 'underwriting',
      loadChildren: './underwriting/underwriting.module#UnderwritingModule',
      data: {pageTitle: 'Underwriting'}
    },
  ];
  
  export const routing = RouterModule.forChild(routes);

@NgModule({
    declarations: [
  
    ],
    imports: [
      routing,
      SmartadminModule
    ],
    entryComponents: []
  })
  export class AskrindoModule {
  }