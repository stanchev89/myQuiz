import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import { UserService } from '../user/user.service';
import {appInterceptorProvider} from './app.interceptor';
import {QuestionsResolver} from './resolvers/questions-resolver'


@NgModule({
  declarations: [NavigationComponent, FooterComponent],
  imports: [
    CommonModule, NgbModule, RouterModule
  ],
  providers: [ UserService, appInterceptorProvider, QuestionsResolver],
  exports: [ NavigationComponent, FooterComponent ],
  bootstrap: [NavigationComponent]
})
export class CoreModule { }