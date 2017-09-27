import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestPage } from "app/askrindo/underwriting/pages/akseptasi/test.page";
import { SmartadminFormsModule } from "app/shared/forms/smartadmin-forms.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SmartadminModule } from "app/shared/smartadmin.module";


export const routes:Routes = [
    {
      path: 'test',
      component: TestPage,
      data: {pageTitle: 'My Test Pages'}
    } 
  ];
  
  @NgModule({
      declarations: [
        TestPage
      ],
      exports: [
        RouterModule,
        TestPage
        ],
      imports: [
        RouterModule.forChild(routes),
        SmartadminFormsModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SmartadminModule
      ],
      providers: [
        ]  ,
      entryComponents: []
    })
    export class UnderwritingModule {
    }  