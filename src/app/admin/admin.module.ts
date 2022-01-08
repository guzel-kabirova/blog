import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import {TuiButtonModule, TuiLabelModule} from '@taiga-ui/core';
import {TuiFieldErrorModule, TuiInputModule, TuiInputPasswordModule} from '@taiga-ui/kit';
import {TuiEditorModule} from '@taiga-ui/addon-editor';

import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashbaord-page/dashboard-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AuthGuard} from './shared/services/auth.guard';
import {SearchPipe} from './shared/pipes/search.pipe';
import {PreloaderModule} from '../shared/components/preloader/preloader.module';
import {AlertComponent} from './shared/components/alert/alert.component';
import {AlertService} from './shared/services/alert.service';

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PreloaderModule,

    TuiButtonModule,
    TuiInputModule,
    TuiFieldErrorModule,
    TuiLabelModule,
    TuiEditorModule,
    TuiInputPasswordModule,
  ],
  exports: [
    AdminRoutingModule,
  ],
  providers: [AuthGuard, AlertService],
})
export class AdminModule {
}
