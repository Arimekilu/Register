import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialExampleModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import { CreatePaymentComponent } from './components/create-payment/create-payment.component';
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {OutputComponent} from "./components/output/output.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [AppComponent, CreatePaymentComponent, OutputComponent, LoginPageComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    HttpClientModule,
    AuthGuardService,
    INTERCEPTOR_PROVIDER,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'accent' },
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
