import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import { reducers } from './+store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {UserModule} from './user/user.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './home/home.component';
import {RulesComponent} from './rules/rules.component';
import {QuestionsService} from './questions/questions.service';
import {HttpClientModule} from '@angular/common/http';
import {QuestionsModule} from './questions/questions.module';
import {UserService} from './user/user.service';
import {SharedModule} from './shared/shared.module';
import { environment } from '../environments/environment';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RulesComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers),
        SharedModule,
        HttpClientModule,
        FormsModule,
        CoreModule,
        UserModule,
        QuestionsModule,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
        // MDBBootstrapModule.forRoot()
    ],
    providers: [QuestionsService, UserService, Title],
    bootstrap: [AppComponent]
})
export class AppModule {
}