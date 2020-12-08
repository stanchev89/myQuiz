import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router'
import { UserService } from '../user/user.service';


@NgModule({
  declarations: [NavigationComponent, FooterComponent],
  imports: [
    CommonModule,NgbModule,RouterModule
  ],
  providers:[UserService],
  exports:[NavigationComponent,FooterComponent]
})
export class CoreModule { }
