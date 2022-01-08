import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {finalize, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class PreloaderService {

  private isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();

  constructor() { }

  showPreloaderUntilCompleted<T>(observable$: Observable<T>):Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.loadingOn()),
        switchMap(() => observable$),
        finalize(() => this.loadingOff())
      )
  }

  loadingOn() {
    this.isLoading.next(true);
  }

  loadingOff() {
    this.isLoading.next(false);
  }
}
