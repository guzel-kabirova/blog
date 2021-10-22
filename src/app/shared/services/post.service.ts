import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreateResponse, Post} from '../interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class PostService {

  isFetching = false;

  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post<FbCreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map(response => {
        return {
          id: response.name,
          ...post,
          date: new Date(post.date),
        };
      }));
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            id: key,
            ...response[key],
            date: new Date(response[key].date)
          }));
      }));
  }

  deletePost(id:string) {
    return this.http.delete(`${environment.fbDbUrl}/posts/${id}.json`)
  }
}
