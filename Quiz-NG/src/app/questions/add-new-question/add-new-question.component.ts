import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../questions.service";
import {IQuestion} from "../../interfaces";
import { Router} from "@angular/router";

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.css']
})
export class AddNewQuestionComponent implements OnInit {
  pageTitle = 'Add new question';
  categories:[]


  constructor(private questionsService: QuestionsService, private route: Router) {
    this.questionsService.loadCategories().subscribe(c => this.categories = c);
  }

  ngOnInit(): void {
  }

  onSubmit(data){
    console.log(data);
    const [formData,selectOption] = data;
    const category = this.categories[+selectOption.selectedIndex];
    const {question,correctAnswer,incorrectAnswer1,incorrectAnswer2,incorrectAnswer3} = formData.form.value;
    const incorrectAnswers = [incorrectAnswer1,incorrectAnswer2,incorrectAnswer3].filter(q => q !== '' && q !== undefined);
    const newQuestion = {
      category: category,
      type: 'multiple',
      difficulty: 'medium',
      question: question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers
    };
    this.questionsService.addNewQuestion(newQuestion).subscribe(() => this.route.navigate(['/categories']))
  }

}