import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {PostService} from '../../shared/services/post.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  gSub$: Subscription | undefined;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private ref: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.gSub$ = this.route.params
      .pipe(
        switchMap(params => {
          return this.postService.getById(params.id);
        }),
      ).subscribe(post => {
        this.post = post;
        this.ref.detectChanges();
      });
  }

  ngOnDestroy() {
    this.gSub$ && this.gSub$.unsubscribe();
  }
}
