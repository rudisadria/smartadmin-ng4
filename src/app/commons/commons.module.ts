import { NgModule } from '@angular/core';
import { commonRouting } from 'app/commons/commons.routing';
import { NG_VALIDATORS } from '@angular/forms';
import { EncryptionService } from 'app/commons/services/encryption.service';
import { AuthService } from 'app/commons/services/auth.service';
import { RestValidator } from 'app/commons/validators/rest.validator';
import { SecureJsonApiService } from 'app/commons/services/secure-json-api.service';
import { ProfilePage } from 'app/commons/pages/profile/profile.page';
import { Routes, RouterModule } from '@angular/router';

export const routes:Routes = [
  {
    path: 'profile2',
    component: ProfilePage,
    data: {pageTitle: 'My Profile'}
  }  
];

@NgModule({
    declarations: [
      ProfilePage
    ],
    exports: [
      RouterModule,
      ProfilePage
      ],
    imports: [
      RouterModule.forChild(routes)        
    ],
    providers: [
        { provide: NG_VALIDATORS, useExisting: RestValidator, multi: true },
        EncryptionService,
        SecureJsonApiService,
        AuthService
      ]  ,
    entryComponents: []
  })
  export class CommonsModule {
  }  
  