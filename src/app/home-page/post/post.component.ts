import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {PostModel} from '../../core/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post: PostModel | undefined;
}


