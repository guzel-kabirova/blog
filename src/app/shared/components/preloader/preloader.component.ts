import { Component, ChangeDetectionStrategy } from '@angular/core';
import {PreloaderService} from './preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloaderComponent {

  constructor(public preloader: PreloaderService) { }

}
