import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {PostFacadeService} from '../../core/services/post.facade.service';
import {PostModel} from '../../core/models/post.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit {
  form: FormGroup | undefined;
  public isFetching$: Observable<boolean> = this.facade.isFetching$;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private facade: PostFacadeService,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.route.params
      .pipe(switchMap(params => this.facade.getById(params.id)))
      .subscribe((post) => this.form?.setValue({title: post.title, text: post.text}));
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form) {
      if (this.form.invalid) {
        return;
      }

    //   this.facade.updatePost(
    //       {
    //         ...this.post,
    //         ...this.form.value,
    //       },
    //     ).subscribe()
    }
  }
}
