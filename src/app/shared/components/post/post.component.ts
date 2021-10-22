import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Post} from '../../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {

  @Input() post: Post | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
