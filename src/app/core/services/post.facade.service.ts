import {Injectable} from '@angular/core';
import {PostStoreService} from './post.store.service';
import {PostRepositoryService} from './post.repository.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {finalize, first, tap} from 'rxjs/operators';
import {PostModel} from '../models/post.model';
import {PostDto} from '../dto/post.dto';

@Injectable({
  providedIn: 'root',
})
export class PostFacadeService {
  private isFetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isFetching$: Observable<boolean> = this.isFetching.asObservable();

  public posts$: Observable<PostModel[]> = this.store.posts$;

  constructor(
    private store: PostStoreService,
    private repository: PostRepositoryService,
  ) {
  }

  getAllPosts() {
    this.isFetching.next(true);
    return this.repository.loadPosts()
      .pipe(first(), finalize(() => this.isFetching.next(false)));
  }

  createPost(newPost: Partial<PostModel>) {
    this.isFetching.next(true);
    const post = {
      ...newPost,
      date: new Date().toString(),
    };
    return this.repository.createPost(post)
      .pipe(first(), finalize(() => this.isFetching.next(false)));
  }

  deletePost(id: string) {
    this.isFetching.next(true);
    return this.repository.deletePost(id)
      .pipe(first(), finalize(() => this.isFetching.next(false)));
  }

  getById(id: string) {
    this.isFetching.next(true);
    return this.repository.getPostById(id)
      .pipe(
        first(),
        finalize(() => this.isFetching.next(false)));
  }

  updatePost(post: Partial<PostModel>) {
    this.isFetching.next(true);

    return this.repository.updatePost(post as unknown as PostDto)
      .pipe(
        first(),
        finalize(() => this.isFetching.next(false)));
  }

}
