import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TUI_SANITIZER, TuiDialogModule, TuiNotificationsModule, TuiRootModule, TuiSvgModule} from '@taiga-ui/core';
import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TuiEditorSocketModule} from '@taiga-ui/addon-editor';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {PostComponent} from './home-page/post/post.component';
import {AuthInterceptor} from './shared/auth.interceptor';
import {PreloaderModule} from './shared/components/preloader/preloader.module';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PreloaderModule,

    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TuiEditorSocketModule,
    TuiSvgModule,
  ],
  providers: [
    INTERCEPTOR_PROVIDER,
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
