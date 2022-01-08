import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {PostFacadeService} from '../../core/services/post.facade.service';
import {Observable} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';
import {PreloaderService} from '../../shared/components/preloader/preloader.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['../create-page/create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit {
  id: string | undefined;
  form: FormGroup | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private facade: PostFacadeService,
    private alertService: AlertService,
    private preloader: PreloaderService,
  ) {
  }

  ngOnInit() {
    this.createForm();

    this.route.params
      .pipe(
        switchMap(params => {
          this.id = params.id;
          return this.facade.getById(params.id);
        }),
        tap(post => this.form && this.form.setValue({title: post.title, text: post.text})),
      )
      .subscribe();
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
      this.preloader.showPreloaderUntilCompleted(
        this.facade.updatePost(
          {
            id: this.id,
            ...this.form.value,
          },
        )
          .pipe(
            tap(() => this.alertService.success('Пост обновлен')),
          ),
      ).subscribe();
    }
  }
}
