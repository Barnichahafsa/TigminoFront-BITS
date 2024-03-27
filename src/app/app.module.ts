import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {MatDialogModule} from '@angular/material/dialog';


import {AppComponent} from './app.component';
import {LoginComponent} from './Pages/login/login.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from './service/auth.service';
import {NgOptimizedImage} from "@angular/common";
import {HomeComponent} from './Pages/home/home.component';
import {SidebarComponent} from './components/navbar/sidebar.component';
import {AddWebAdminComponent} from './Pages/add-web-admin/add-web-admin.component';
import {WebAdminListComponent} from './Pages/web-admin-list/web-admin-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LandingComponentComponent} from './Pages/landing/landing-component.component';
import {JwtInterceptor} from "./JwtInterceptor";
import {UpdateWebAdminComponent} from './Pages/update-web-admin/update-web-admin.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {TranslateComponent} from './components/translate/translate.component';
import {MobUserListComponent} from './Pages/mob-user-list/mob-user-list.component';
import {AddMobUserComponent} from './Pages/add-mob-user/add-mob-user.component';
import {FilterPipe} from "./Pipes/filter.pipe";
import {FilterAdminPipe} from "./Pipes/filterAdmin.pipe";
import {filterAgentsSchedule} from "./Pipes/filterAgentsSchedule.pipe";

import {MyAdminAccountComponent} from './Pages/my-admin-account/my-admin-account.component';
import {AgentsListComponent} from './Pages/agents-list/agents-list.component';
import {
  DayService,
  MonthAgendaService,
  MonthService,
  RecurrenceEditorModule,
  ScheduleModule,
  WeekService,
  WorkWeekService
} from "@syncfusion/ej2-angular-schedule";
import {SchedulerComponent} from './Pages/scheduler/scheduler.component';
import {ButtonModule} from '@syncfusion/ej2-angular-buttons';
import {TextBoxModule} from "@syncfusion/ej2-angular-inputs";
import {AddTaskComponent} from './Pages/add-task/add-task.component';
import {ResidenceListComponent} from './Pages/residence-list/residence-list.component';
import {DepenseComponent} from './Pages/depense/depense.component';
import {FilterDepensePipe} from "./Pipes/filterDepense.pipe";
import { AddDepenseComponent } from './Pages/add-depense/add-depense.component';

const appRoutes: Routes = [
  {path: '', component: LandingComponentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'getAllAdmins', component: WebAdminListComponent},
  {path: 'register', component: AddWebAdminComponent},
  {path: 'update/:id', component: UpdateWebAdminComponent},
  {path: 'coproprietaires', component: MobUserListComponent},
  {path: 'addUser', component: AddMobUserComponent},
  {path: 'myAccount', component: MyAdminAccountComponent},
  {path: 'agents', component: AgentsListComponent},
  {path: 'schedule', component: SchedulerComponent},
  {path: 'addTask/:id', component: AddTaskComponent},
  {path: 'getAllResidences', component: ResidenceListComponent},
  {path: 'getAllDepenses', component: DepenseComponent},
  {path: 'addDepense', component: AddDepenseComponent},

];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    AddWebAdminComponent,
    WebAdminListComponent,
    SidebarComponent,
    LandingComponentComponent,
    UpdateWebAdminComponent,
    ConfirmationDialogComponent,
    TranslateComponent,
    MobUserListComponent,
    AddMobUserComponent,
    FilterPipe,
    FilterAdminPipe,
    FilterDepensePipe,
    filterAgentsSchedule,
    MyAdminAccountComponent,
    AgentsListComponent,
    SchedulerComponent,
    AddTaskComponent,
    ResidenceListComponent,
    DepenseComponent,
    AddDepenseComponent
  ],

  imports: [
    BrowserModule,
    ButtonModule,
    ScheduleModule, RecurrenceEditorModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    TranslateModule.forRoot(
      {
        defaultLanguage: 'es',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    ),
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule, MatInputModule,
    MatAutocompleteModule,

    MatChipsModule, MatLegacyChipsModule, TextBoxModule],
  exports: [RouterModule, TranslateModule],
  providers: [HttpClient,  AuthService,  DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
