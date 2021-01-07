import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import { UserService } from '../user/user.service';
import {appInterceptorProvider} from './app.interceptor';
// import {QuestionsResolver} from './resolvers/questions-resolver';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component'
import {SharedModule} from "../shared/shared.module";
import { NoResponseComponent } from './no-response/no-response.component';


@NgModule({
  declarations: [NavigationComponent, FooterComponent, AboutComponent, ContactsComponent, NoResponseComponent],
  imports: [
    CommonModule, NgbModule, RouterModule, SharedModule
  ],
  providers: [ UserService, appInterceptorProvider],
  exports: [ NavigationComponent, FooterComponent ],
  bootstrap: [NavigationComponent]
})
export class CoreModule { }