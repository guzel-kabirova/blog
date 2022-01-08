import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {PostDto} from '../dto/post.dto';
import {FbCreateResponse} from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  constructor(private http: HttpClient) {
  }

  postsUrl(id = '') {
    return `${environment.fbDbUrl}/posts${id.length ? '/' + id : id}.json`;
  }

  loadPosts(): Observable<PostDto[]> {
    return this.http.get<PostDto[]>(this.postsUrl());
  }

  getPostById(id: string): Observable<PostDto> {
    return this.http.get<PostDto>(this.postsUrl(id))
  }

  createPost(post: Partial<PostDto>): Observable<FbCreateResponse> {
    return this.http.post<FbCreateResponse>(this.postsUrl(), post);
  }

  updatePost(post: Partial<PostDto> & { id: string }): Observable<PostDto> {
    return this.http.patch<PostDto>(this.postsUrl(post.id), post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(this.postsUrl(id));
  }
}
