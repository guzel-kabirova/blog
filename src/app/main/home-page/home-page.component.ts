import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {PostModel} from '../../core/models/post.model';
import {PostFacadeService} from '../../core/services/post.facade.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor(private facade: PostFacadeService) {
  }

  public posts$: Observable<PostModel[]> = this.facade.posts$;

  ngOnInit() {
    this.facade.getAllPosts()
      .subscribe();
  }
}
