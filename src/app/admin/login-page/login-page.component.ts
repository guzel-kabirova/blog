import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {

  form: FormGroup | undefined;
  isFetching: boolean = false;
  error$ = this.authService.error$;
  message: string | undefined;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.route.queryParams.subscribe(params => {
      if (params['authAgain']) {
        this.message = 'Пожалуйста, введите данные';
      } else if (params['timeout']) {
        this.message = 'Время сессии истекло, введите данные снова'
      }
    });
  }


  createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form) {
      if (this.form.invalid) {
        return;
      }
      const user: User = {
        email: this.form.value.email,
        password: this.form.value.password,
      };
      this.isFetching = true;
      this.authService.login(user).subscribe(() => {
          this.form!.reset();
          this.router.navigate(['/admin', 'dashboard']);
          this.isFetching = false;

        },
        error => {
          this.isFetching = false;
        });
    }
  }
}
