import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionsService} from "../questions.service";
import { Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {first,tap} from 'rxjs/operators'
import {AppRootState} from "../../+store";
import {error} from '../../user/+store/actions'
import {setActiveHeader} from "../../+store/actions";


@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.css']
})
export class AddNewQuestionComponent implements OnInit, OnDestroy {
  pageTitle = 'Add new question';


  categories$ = this.store.select((state:AppRootState) => state.questions.categories);
  error$ = this.store.select((state:AppRootState) => state.auth.errorMessage);

  // This is hardcode in case of empty Database to be able to add new question
  alternateCategories = ['Animals','Cartoon & Animations','Computers', 'Geography', 'Books',
    'Comics', 'Film', 'History', 'Music', 'Mythology','Politics','Sports','Vehicles','Video Games'
  ];


  constructor(private questionsService: QuestionsService, private route: Router, private titleService: Title, private store: Store) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
    this.store.dispatch(setActiveHeader({activeHeader:'addNewQuestion'}));
  }

  ngOnInit(): void {
    this.setTitle('myQuiz-Add new question');
    this.categories$.pipe(first(),tap((categories: string[]) => {
      if(categories.length === 0 ){
        this.questionsService.loadAllQuestions().pipe(first()).subscribe();
      }
    })).subscribe();
  }

  onSubmit(data){
    const [formData,selectOption] = data;
    this.store.select((state:AppRootState) => {
      const categories = state.questions.categories;
      const index = Number(selectOption.selectedIndex);
      const selectedCategory = categories[index];
      let questionAlreadyExist = false;
      const {question,correctAnswer,incorrectAnswer1,incorrectAnswer2,incorrectAnswer3} = formData.form.value;
      const incorrectAnswers = [incorrectAnswer1,incorrectAnswer2,incorrectAnswer3].filter(q => q !== '' && q !== undefined);
      for (const q of state.questions.allQuestions[selectedCategory]) {
          if(q.question.trim() === question.trim()) {
            questionAlreadyExist = true;
            break;
          }
      };
      if(questionAlreadyExist) {
        this.store.dispatch(error({errorMessage:'This question already exists in our library!' }))
        return ;
      }

      const newQuestion = {
        category: selectedCategory,
        type: 'multiple',
        difficulty: 'medium',
        question: question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers
      }
      this.questionsService.addNewQuestion(newQuestion).pipe(first()).subscribe(() => {
        this.store.dispatch(error({errorMessage:''}));
        this.questionsService.loadAllQuestions().pipe(first()).subscribe();
       return  this.route.navigate(['/categories'])
      })
    }).pipe(first()).subscribe();

  }

  ngOnDestroy() {
    this.store.dispatch(error({errorMessage:''}));
    this.store.dispatch(setActiveHeader({activeHeader:''}));
  }
}