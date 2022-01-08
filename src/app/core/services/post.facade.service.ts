import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {PostStoreService} from './post.store.service';
import {PostRepositoryService} from './post.repository.service';
import {PostModel} from '../models/post.model';
import {PostDto} from '../dto/post.dto';

@Injectable({
  providedIn: 'root',
})
export class PostFacadeService {

  public posts$: Observable<PostModel[]> = this.store.posts$;

  constructor(
    private store: PostStoreService,
    private repository: PostRepositoryService,
  ) {
  }

  getAllPosts() {
    return this.repository.loadPosts();
  }

  createPost(newPost: Partial<PostModel> & { title: string, text: string, author: string }) {
    const post = {
      ...newPost,
      date: new Date().toString(),
    };
    return this.repository.createPost(post);
  }

  deletePost(id: string) {
    return this.repository.deletePost(id);
  }

  getById(id: string) {
    return this.repository.getPostById(id);
  }

  updatePost(post: Partial<PostDto> & { id: string }) {
    return this.repository.updatePost(post);
  }
}
