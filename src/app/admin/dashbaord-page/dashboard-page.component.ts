import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {PostService} from '../../shared/services/post.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashbord-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  pSub$!: Subscription;
  dSub$!: Subscription;
  posts: Post[] = [];
  search = '';
  isFetching = false;

  constructor(private postService: PostService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.isFetching = true;
    this.pSub$ = this.postService.getAllPosts().subscribe(
      response => {
        this.posts = response;
        this.isFetching = false;
        this.ref.detectChanges();
      },
    );
  }

  remove(id: string) {
    this.isFetching = true;
    this.dSub$ = this.postService.deletePost(id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.isFetching = false;
        this.ref.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.pSub$) {
      this.pSub$.unsubscribe();
    }

    if (this.dSub$) {
      this.dSub$.unsubscribe();
    }
  }
}
