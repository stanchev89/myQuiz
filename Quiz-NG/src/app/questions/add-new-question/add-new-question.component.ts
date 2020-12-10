import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../questions.service";

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.css']
})
export class AddNewQuestionComponent implements OnInit {
  pageTitle = 'Add new question';
  categories:[]


  constructor(private questionsService: QuestionsService) {
    this.questionsService.loadCategories().subscribe(c => this.categories = c);
  }

  ngOnInit(): void {
  }

  onSubmit(data){

  }

}