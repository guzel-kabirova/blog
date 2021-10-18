import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Post} from '../admin/shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  posts: Post[] = [
    {
      title: 'Политическое учение Локка как конституционная демократия',
      text: 'Тоталитарный тип политической культуры интегрирует коллапс Советского Союза. Наконец, постиндустриализм обретает функциональный механизм власти. Кризис легитимности, несмотря на внешние воздействия, неоднозначен.',
      author: 'Лидия Смирнова',
      data: '18.10.2021',
      id: 1
    },
    {
      title: 'Почему доступна почвенная корка?',
      text: 'Рендзина по определению инструментально обнаружима. Инфильтрация, вследствие пространственной неоднородности почвенного покрова, неустойчива. Латерит, как следствие уникальности почвообразования в данных условиях, регионально вызывает сушильный шкаф, вне зависимости от предсказаний теоретической модели явления. Давление почвенной влаги синфазно.',
      author: 'Артём Дмитриев',
      data: '19.10.2021',
      id: 2
    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
