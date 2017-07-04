import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

//routing module
// Routing Module
import { AppRoutingModule } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

//service
import { AuthenticationService } from './services/authentication.service';
import { FooterComponent } from './footer/footer.component';
import { TablecaseComponent } from './tablecase/tablecase.component';

//
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HomeComponent } from './home/home.component';
import { SuitcaseComponent } from './suitcase/suitcase.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    TablecaseComponent,
    HomeComponent,
    SuitcaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Bs3ModalModule
  ],
  providers: [{
    provide: [LocationStrategy, AuthenticationService],
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
