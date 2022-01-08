import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';

import {PostModel} from '../core/models/post.model';
import {PostFacadeService} from '../core/services/post.facade.service';
import {PreloaderService} from '../shared/components/preloader/preloader.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  posts$: Observable<PostModel[]> = this.preloader.showPreloaderUntilCompleted(this.facade.getAllPosts());

  constructor(
    private facade: PostFacadeService,
    private preloader: PreloaderService,
  ) {
  }
}
