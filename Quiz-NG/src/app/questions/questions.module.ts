import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsService } from './questions.service';
import { QuestionsRoutingModule } from './questions-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { UserService } from '../user/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from '../shared/shared.module';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionComponent } from './question/question.component';
import { FormsModule } from '@angular/forms';
import { AddNewQuestionComponent } from './add-new-question/add-new-question.component';
import {NavigationComponent} from "../core/navigation/navigation.component";


@NgModule({
  declarations: [  CategoriesComponent, CategoriesListComponent, QuestionsListComponent, QuestionComponent, AddNewQuestionComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    NgbModule,
    SharedModule,
    FormsModule,
  ],
  providers: [UserService, QuestionsService,NavigationComponent],
  exports: [CategoriesListComponent],
  bootstrap: []

})
export class QuestionsModule { }