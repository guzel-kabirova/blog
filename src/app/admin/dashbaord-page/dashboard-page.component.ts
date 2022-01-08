import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {PostFacadeService} from '../../core/services/post.facade.service';
import {PostModel} from '../../core/models/post.model';
import {AlertService} from '../shared/services/alert.service';
import {PreloaderService} from '../../shared/components/preloader/preloader.service';


@Component({
  selector: 'app-dashbord-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  search = '';

  public posts$: Observable<PostModel[]> = this.facade.posts$;

  constructor(
    private facade: PostFacadeService,
    private alertService: AlertService,
    public preloader: PreloaderService,
  ) {
  }

  ngOnInit() {
    this.preloader.showPreloaderUntilCompleted(
      this.facade.getAllPosts(),
    ).subscribe();
  }

  remove(id: string) {
    this.facade.deletePost(id)
      .pipe(
        tap(() => this.alertService.danger('Пост удален')),
      )
      .subscribe();
  }
}
