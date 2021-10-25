import {Pipe, PipeTransform} from '@angular/core';
import {PostModel} from '../../../core/models/post.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform{
  transform(posts: PostModel[], searchStr: string = ''): PostModel[] {
    if (searchStr.trim()) {
      return posts.filter(post => post.title.toLowerCase().includes(searchStr.toLowerCase()))
    } return posts
  }
}
