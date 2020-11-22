import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsService } from './questions.service';
import { QuestionsRoutingModule } from './questions-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { UserService } from '../user/user.service';



@NgModule({
  declarations: [  CategoriesComponent,CategoriesListComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
  ],
  providers:[UserService,QuestionsService],
  exports:[]

})
export class QuestionsModule { }
