import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {PostModel} from '../core/models/post.model';
import {PostFacadeService} from '../core/services/post.facade.service';
import {PreloaderService} from '../shared/components/preloader/preloader.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent {
  post$: Observable<PostModel> = this.route.params
    .pipe(
      switchMap(params => this.preloader.showPreloaderUntilCompleted(this.facade.getById(params.id))));

  constructor(
    private route: ActivatedRoute,
    private facade: PostFacadeService,
    private preloader: PreloaderService,
  ) {
  }
}
