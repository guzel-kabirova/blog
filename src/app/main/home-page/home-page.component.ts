import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/services/post.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  posts: Post[] | undefined;
  gSub$: Subscription | undefined;

  constructor(private postService: PostService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.gSub$ = this.postService.getAllPosts()
      .subscribe(posts => {
        this.posts = posts;
        this.ref.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.gSub$ && this.gSub$.unsubscribe();
  }
}
