import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true
    } else {

      this.auth.logout()
      this.router.navigate(['/login'], {
        queryParams: {
          loginAgain: true
        }
      })
      return false
    }
  }

}
