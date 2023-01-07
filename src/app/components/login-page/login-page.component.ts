import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  hide = true;
  submitted = false
  message: string | undefined

  loginForm: FormGroup

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(6))
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
        if (params['loginAgain']) {
          this.message = 'Введите данные'
        } else if (params['authFailed']) {
          this.message = 'Сессия истекла, перелогиньтесь'
        }
      }
    )
  }

  submit() {
    if (this.loginForm.invalid) {
      return
    }

    this.submitted = true

    const user: User = this.loginForm.value

    this.auth.login(user).subscribe(() => {
      this.loginForm.reset()
      this.router.navigate(['/input'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}
