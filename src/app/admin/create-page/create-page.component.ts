import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostFacadeService} from '../../core/services/post.facade.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent implements OnInit {

  form: FormGroup | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private facade: PostFacadeService
  ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form) {
      if (this.form.invalid) {
        return;
      }
      this.facade.createPost(this.form.value)
        .subscribe(() => this.form && this.form.reset())
    }
  }
}
