import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  form: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]

    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    console.log(user);
  }
}
