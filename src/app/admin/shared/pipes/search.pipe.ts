import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../../../shared/interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform{
  transform(posts: Post[], searchStr: string = ''): Post[] {
    if (searchStr.trim()) {
      return posts.filter(post => post.title.toLowerCase().includes(searchStr.toLowerCase()))
    } return posts
  }
}
