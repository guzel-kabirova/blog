import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {PostModel} from '../../core/models/post.model';
import {PostFacadeService} from '../../core/services/post.facade.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent implements OnInit {
  post: PostModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private facade: PostFacadeService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          return this.facade.getById(params.id);
        }),
      ).subscribe(post => {
      this.post = post;
      this.cdr.detectChanges();
    });
  }
}
