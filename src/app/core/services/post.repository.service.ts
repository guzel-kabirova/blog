import {Injectable} from '@angular/core';
import {PostApiService} from './post.api.service';
import {PostStoreService} from './post.store.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {PostModel} from '../models/post.model';
import {PostDto} from '../dto/post.dto';

@Injectable({
  providedIn: 'root',
})
export class PostRepositoryService {
  constructor(
    private api: PostApiService,
    private store: PostStoreService,
  ) {
  }

  loadPosts(): Observable<PostModel[]> {
    return this.api.loadPosts()
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response)
            .map(key => new PostModel({
              id: key,
              ...response[key],
            }));
        }),
        tap(posts => this.store.setPosts(posts)),
      );
  }

  getPostById(id: string): Observable<PostModel> {
    return this.api.getPostById(id)
      .pipe(map(response => new PostModel(response)));
  }

  createPost(post: Partial<PostDto>): Observable<PostModel> {
    return this.api.createPost(post)
      .pipe(
        map(response => new PostModel(response)),
        tap(post => this.store.addPost(post)),
      );
  }

  updatePost(post: Partial<PostDto> & { id: string }): Observable<PostModel> {
    return this.api.updatePost(post)
      .pipe(
        map(response => new PostModel(response)),
        tap(post => this.store.updatePost(post)),
      );
  }

  deletePost(id: string): Observable<void> {
    return this.api.deletePost(id)
      .pipe(tap(() => this.store.deletePost(id)));
  }
}
