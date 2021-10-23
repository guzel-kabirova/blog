import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PostFacadeService} from '../../core/services/post.facade.service';
import {PostModel} from '../../core/models/post.model';

@Component({
  selector: 'app-dashbord-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  search = '';

  public posts$: Observable<PostModel[]> = this.facade.posts$;
  public isFetching$: Observable<boolean> = this.facade.isFetching$;

  constructor(private facade: PostFacadeService) {
  }

  ngOnInit() {
    this.facade.getAllPosts()
      .subscribe();
  }

  remove(id: string) {
    this.facade.deletePost(id)
      .subscribe();
  }
}
