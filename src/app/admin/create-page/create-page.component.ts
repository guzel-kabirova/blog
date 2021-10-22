import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../shared/services/post.service';
import {Post} from '../../shared/interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService) {

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
    if(this.form.invalid) {
      return
    }
    const newPost: Post = {
      ...this.form.value,
       date: new Date()
    }
    this.postService.create(newPost)
      .subscribe(
        response => {
          this.form.reset();
        })
  }
}
