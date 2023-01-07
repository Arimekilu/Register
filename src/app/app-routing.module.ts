import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreatePaymentComponent} from "./components/create-payment/create-payment.component";
import {OutputComponent} from "./components/output/output.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {CreateOtputComponent} from "./components/create-otput/create-otput.component";

const routes: Routes = [
  {path: 'input', component: CreatePaymentComponent, canActivate: [AuthGuardService]},
  {path: 'output', component: OutputComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginPageComponent},
  {path: 'inout', component: CreateOtputComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
