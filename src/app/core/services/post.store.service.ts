import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {PostModel} from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostStoreService {
  private posts: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>([]);
  public posts$: Observable<PostModel[]> = this.posts.asObservable();

  setPosts(posts: PostModel[]): void {
    posts = posts.reverse();
    this.posts.next(posts);
  }

  addPost(post: PostModel): void {
    this.posts.next([...this.posts.getValue(), post]);
  }

  deletePost(id: string): void {
    this.posts.next(this.posts.getValue().filter(post => post.id !== id));
  }

  updatePost(updatedPost: PostModel): void {
    this.posts.next(this.posts.getValue().map(post => {
      if (post.id === updatedPost.id) {
        return updatedPost;
      }
      return post;
    }));
  }
}
