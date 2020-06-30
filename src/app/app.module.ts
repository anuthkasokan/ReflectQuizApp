import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLayoutService } from './layouts/admin-layout/admin-layout.service';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { MsalUserService } from './msaluser.service';

export const protectedResourceMap:[string, string[]][]=[];	
@NgModule({
  imports: [
    MsalModule.forRoot({
    
      auth:{
        clientId:'5ad37ea5-ce50-4e8f-a178-8a05f57cb4cd',
        authority: 'https://login.microsoftonline.com/cea101fb-acfa-4ba2-90e9-5a83909297e7',
        redirectUri: 'http://localhost:4200/',
        
      }
    }, {
      protectedResourceMap: protectedResourceMap
  }),
    BrowserAnimationsModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule 
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent

  ],
  providers: [AdminLayoutService,MsalUserService, {	    provide: HTTP_INTERCEPTORS,	    useClass: MsalInterceptor,	    multi: true	  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
