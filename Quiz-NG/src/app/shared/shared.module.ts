import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';
import { FixHtmlSymbolsPipe } from './fix-html-symbols.pipe';
import { WithSpacesPipe } from './with-spaces.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonColorDirective } from './button-color.directive';
import { GetTimerClassPipe } from './get-timer-class.pipe';



@NgModule({
  declarations: [
    PageTitleComponent,
    FixHtmlSymbolsPipe,
    WithSpacesPipe,
    WithSpacesPipe,
    ButtonColorDirective,
    GetTimerClassPipe,
  ],
  imports: [
    CommonModule,
      NgbModule
  ],
  exports: [
    PageTitleComponent,
    FixHtmlSymbolsPipe,
    WithSpacesPipe,
    ButtonColorDirective,
    GetTimerClassPipe,
  ]
})
export class SharedModule { }