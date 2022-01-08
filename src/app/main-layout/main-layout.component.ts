import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PreloaderService} from '../shared/components/preloader/preloader.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PreloaderService]
})
export class MainLayoutComponent {
}
